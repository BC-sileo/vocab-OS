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

  await page.addInitScript(() => {
    localStorage.setItem("vocabOS_v02", JSON.stringify({
      pageSize: 10,
      sessionPages: 1,
      mode: "swipe",
      states: { "1": "old-review-state" },
      notes: {
        "1": {
          memo: "_preserve this user-authored core image",
          imageUrl: "https://example.com/vocabulary-image.jpg",
          imageSource: "https://example.com/source",
          imageCreator: "Test creator",
          imageLicense: "Test license",
          viewCount: 37
        }
      }
    }));
    localStorage.setItem("vocabOS_learning_v1", JSON.stringify({
      records: { "1": { weak: true, completedFirstRun: true, nextReviewAt: 123456789 } },
      activeSession: null,
      pendingSelection: null,
      wordCount: 5
    }));
    localStorage.setItem("vocabOS_tags_v1", JSON.stringify({
      version: 1,
      nextTagId: 2,
      tags: [{ id: 1, name: "PRESERVE_TAG", key: "preserve_tag" }],
      assignments: [{ entityType: "word", entityId: 1, wordId: 1, tagId: 1, value: "source-value", source: "test-source" }],
      customWords: [],
      imports: []
    }));
    localStorage.setItem("vocabOS_push_config_v1", JSON.stringify({
      workerUrl: "https://example.workers.dev",
      apiToken: "must-not-be-exported",
      deviceId: "test-device"
    }));
  });
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

  const backupDownloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "データをバックアップ" }).click();
  const backupDownload = await backupDownloadPromise;
  assert.match(backupDownload.suggestedFilename(), /^vocab-os-backup-.*\\.json$/);
  const backupPath = await backupDownload.path();
  const backup = JSON.parse(await readFile(backupPath, "utf8"));
  assert.equal(backup.format, "vocab-os-backup");
  assert.ok(backup.data.vocabOS_v02.notes["1"].memo.includes("preserve this user-authored core image"));
  assert.equal(backup.data.vocabOS_v02.notes["1"].imageSource, "https://example.com/source");
  assert.equal(backup.data.vocabOS_v02.notes["1"].viewCount, 37);
  assert.equal(backup.data.vocabOS_learning_v1.records["1"].completedFirstRun, true);
  assert.equal(backup.data.vocabOS_tags_v1.assignments[0].source, "test-source");
  assert.ok(backup.manifest.excludedKeys.some(key => key.includes("vocabOS_push_config_v1")));
  assert.equal(JSON.stringify(backup).includes("must-not-be-exported"), false, "notification API tokens are excluded");

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

  await page.locator("#tagImportBack").click();
  await page.locator("#notesHomeBtn").click();
  await page.getByRole("button", { name: "初見モード" }).click();
  await page.locator("#learningSetupView:not(.hidden)").waitFor();
  await page.locator("#chooseLearningWords").click();
  await page.locator("#learningSelectionPreview").getByText(/語/).first().waitFor();
  await page.locator("#startLearningSelection:not([disabled])").waitFor();

  assert.deepEqual(errors, [], `browser runtime errors: ${errors.join("; ")}`);
  console.log("E2E smoke passed: app boot, notes navigation, tag edit, lossless local-data backup, secret exclusion, observer stability, importer preview, first-run word selection.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
