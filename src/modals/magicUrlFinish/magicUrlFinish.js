var pageId = "magicUrlFinish";

globalStore.pagesConfig.push({
  id: pageId,
  title: "Check your email inbox",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

globalStore[pageId] = {
  async guard() {},

  async onFinish(userId, secret) {
    const store = Alpine.store("authModal");

    try {
      const adapter = store.adapter;

      if (!adapter) {
        throw new Error("No adapter loaded.");
      }

      if (!adapter.signInMagicUrlFinish) {
        throw new Error("Adapter does not support this method.");
      }

      await adapter.signInMagicUrlFinish(userId, secret);
    } catch (err) {
      console.error(err);
      store.error.errorMsg = err.message ?? err;
      store.open("error");
    }
  },
};
