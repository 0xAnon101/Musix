"workbox" in self &&
  workbox.precaching.precacheAndRoute(
    [
      { revision: "c0ca93aa3067de97f73827e007545549", url: "./index.html" },
      { revision: null, url: "main.7404e07c69dd6be7408d.css" },
      { revision: "734cb8700713ff12818ee60a10b95367", url: "main.css" },
      { revision: "473e7b15a94f9b19607591ee1536aaed", url: "main.js" },
      {
        revision: "fb6fca4f0fa26a7e27d26480a74532c9",
        url: "main.js.LICENSE.txt",
      },
      { revision: "d41d8cd98f00b204e9800998ecf8427e", url: "manifest.json" },
    ] || []
  );
