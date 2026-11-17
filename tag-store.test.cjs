const test = require("node:test");
const assert = require("node:assert/strict");

function bootTagStore(){
  const values = new Map();
  global.window = global;
  global.localStorage = {
    getItem(key){ return values.has(key) ? values.get(key) : null; },
    setItem(key,value){ values.set(key,String(value)); },
    removeItem(key){ values.delete(key); }
  };
  delete require.cache[require.resolve("./tag-store.js")];
  require("./tag-store.js");
  return { store: global.VocabOSTagStore, values };
}

test("tag store keeps lexical tags separate and imports idempotently", () => {
  const {store,values} = bootTagStore();
  const words = [
    {id:7,word:"abandon",translation:"手放す",pos:"v",ven:18},
    {id:12,word:"associate",translation:"関連づける",pos:"v",ven:18}
  ];
  store.initialize(words);

  assert.equal(words[0].id,7);
  assert.equal(words[0].ven,undefined);
  assert.equal(store.getNumericValue(7,"VEN度"),18);
  assert.equal(store.findWord("ＡBANDON").id,7);

  const csv = [
    "word,tags,translation,pos,source",
    'Abandon,"新J8:3;FORMAL",,,新JACET8000',
    'abandon,"新J8:3;CASUAL",,,別資料',
    'abandonment,"新J8:4",放棄,n,資料A'
  ].join("\n");
  const preview = store.previewImport(csv);
  assert.equal(preview.summary.new,1);
  assert.equal(preview.summary.existing,1);
  assert.equal(preview.summary.repeated,1);
  assert.equal(preview.items.find(item=>item.key==="abandon").additions.length,4);

  const report = store.applyImport(preview,words);
  assert.equal(report.created,1);
  assert.equal(report.updated,1);
  assert.equal(words.find(word=>word.word==="abandon").id,7);
  const added = words.find(word=>word.word==="abandonment");
  assert.ok(added);
  assert.ok(added.id>12);
  assert.equal(store.getNumericValue(7,"VEN度"),18);
  assert.ok(store.getWordTags(7).some(tag=>tag.name==="新J8"&&tag.value===3));
  assert.ok(store.getWordTags(7).some(tag=>tag.name==="出典"&&tag.value==="新JACET8000"));

  const repeat = store.previewImport(csv);
  const repeatReport = store.applyImport(repeat,words);
  assert.equal(repeatReport.created,0);
  assert.equal(repeatReport.tagsAdded,0);
  assert.equal(words.filter(word=>word.word==="abandon").length,1);

  store.addTag("word",7,"FORMAL",null,"manual");
  store.addTag("word",7,"CASUAL",null,"manual");
  assert.equal(store.matchesTagQuery(7,"新J8=3 AND FORMAL"),true);
  assert.equal(store.matchesTagQuery(7,"新J8=3|4 AND FORMAL"),true);
  assert.equal(store.matchesTagQuery(7,"FORMAL OR CASUAL"),true);
  assert.equal(store.matchesTagQuery(7,"FORMAL AND !CASUAL"),false);

  const conflictPreview = store.previewImport("word,tags\nabandon,新J8:4");
  assert.equal(conflictPreview.summary.conflicts,1);
  const conflictReport = store.applyImport(conflictPreview,words);
  assert.equal(conflictReport.conflicts.length,1);
  assert.equal(store.getNumericValue(7,"新J8"),undefined);

  const ambiguous = store.previewImport("word,tags\nabandonn,TEST");
  assert.equal(ambiguous.items[0].status,"ambiguous");
  assert.equal(store.applyImport(ambiguous,words).skipped,1);
  assert.equal(words.some(word=>word.word==="abandonn"),false);

  assert.ok(values.has("vocabOS_tags_v1"));
});
