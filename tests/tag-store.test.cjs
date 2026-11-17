const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const storage = new Map();
const context = {
  console,
  Map, Set, Array, Number, String, Math, JSON, Date, Object,
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); }
  }
};
context.window = context;
vm.runInNewContext(fs.readFileSync("tag-store.js", "utf8"), context);
const tags = context.VocabOSTagStore;
const words = [{ id: 7, word: "Abandon", ven: 18 }, { id: 8, word: "abandoned" }];
tags.initialize(words);

assert.equal(words[0].ven, undefined, "legacy VEN property is removed after migration");
assert.equal(tags.getNumericValue(7, "VEN度"), 18, "legacy VEN is migrated to a generic numeric tag");
assert.equal(tags.findWord("  ABANDON "), words[0], "normalized spelling lookup is exact and case-insensitive");
assert.notEqual(tags.findWord("abandonment"), words[0], "derived words are not merged");

const preview = tags.previewImport(
  "word,tags,translation,pos,source\nAbandon,新J8:3;FORMAL,,v,新JACET8000\nnewword,VEN度:12;CASUAL,new meaning,n,book"
);
assert.equal(preview.summary.existing, 1);
assert.equal(preview.summary.new, 1);
assert.equal(preview.summary.tagAdditions, 4);
const report = tags.applyImport(preview, words);
assert.equal(report.created, 1);
assert.equal(report.tagsAdded, 5);
assert.equal(words.length, 3);
assert.equal(tags.getNumericValue(7, "VEN度"), 18);
assert.equal(tags.getWordTags(7).some(tag => tag.name === "新J8" && tag.value === 3), true);

const repeated = tags.previewImport(
  "word,tags,translation,pos,source\nAbandon,新J8:3;FORMAL,,v,新JACET8000\nnewword,VEN度:12;CASUAL,new meaning,n,book"
);
assert.equal(repeated.summary.tagAdditions, 0, "re-import preview contains no duplicate tags");
tags.applyImport(repeated, words);
assert.equal(words.length, 3, "re-import does not duplicate words");

assert.equal(tags.matchesTagQuery(7, "新J8=3 AND VEN度>=10"), true);
assert.equal(tags.matchesTagQuery(7, "新J8=3|4 AND !CASUAL"), true);
assert.equal(tags.matchesTagQuery(7, "VEN度<10"), false);

tags.addTag("word", 7, "VEN度", 15, "second-source");
assert.equal(tags.getNumericValue(7, "VEN度"), undefined, "conflicting numeric assertions are not silently collapsed");
const conflict = tags.previewImport("word,tags\nAbandon,VEN度:14");
assert.equal(conflict.summary.conflicts, 1);
console.log("tag-store tests passed");
