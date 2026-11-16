/* Load the Anki-compatible FSRS-6 implementation before learning.js uses it. */
(function(){
  "use strict";
  window.VocabOSFSRSReady=import("https://esm.sh/ts-fsrs@5.4.2?bundle")
    .then(function(module){
      window.VocabOSFSRS=module;
      return module;
    })
    .catch(function(error){
      console.error("Vocab OS could not load FSRS-6.",error);
      return null;
    });
})();