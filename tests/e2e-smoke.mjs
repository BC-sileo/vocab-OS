import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import assert from "node:assert/strict";

const root = fileURLToPath(new URL("../", import.meta.url));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json"
};

const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const relative = normalize(pathname).replace(/^([/\\])+/, "") || "index.html";
    const path = join(root, relative);
    if (!path.startsWith(root)) throw new Error("Invalid path");
    const body = await readFile(path);
    res.writeHead(200, { "content-type": mime[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

const errors = [];
let browser;
try {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));

  await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "単語ノートを開く" }).click();
  await page.locator(".note-list-item").first().waitFor();
  const firstWord = (await page.locator(".note-list-word").first().innerText()).trim();
  assert.ok(firstWord, "note list should render a word");

  await page.locator(".note-list-item").first().click();
  await page.locator("#noteDetailPanel:not(.hidden)").waitFor();
  await page.locator("#wordTagName").fill("E2E_CHECK");
  await page.locator("#wordTagValue").fill("1");
  await page.locator("#addWordTag").click();
  await page.locator("#wordTagChips").getByText("E2E_CHECK 1").waitFor();

  // Repeatedly update the note subtree; this used to trigger a MutationObserver loop.
  await page.locator("#noteSearch").fill(firstWord);
  await page.locator("#noteSearch").fill("");
  await page.waitForTimeout(700);
  await page.getByRole("button", { name: "タグ・インポート" }).click();
  await page.locator("#tagImportView:not(.hidden)").waitFor();
  await page.locator("#tagImportText").fill(`word,tags\n${firstWord},E2E_IMPORT:2`);
  await page.locator("#tagImportPreview").click();
  await page.locator("#tagImportPreviewPanel .tag-import-summary").waitFor();
  assert.match(await page.locator("#tagImportPreviewPanel").innerText(), /E2E_IMPORT/);

  assert.deepEqual(errors, [], `browser runtime errors: ${errors.join("; ")}`);
  console.log("E2E smoke passed: app boot, notes navigation, tag edit, observer stability, importer preview.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
