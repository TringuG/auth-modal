var pageId = "magicUrl";

store.pagesConfig.push({
  id: pageId,
  title: "Sign In with Magic Link",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

store[pageId] = () => {
  return {
    email: "",

    errorMsg: null,
    isLoading: false,

    async guard() {
      this.email = "";

      const store = Alpine.store("authModal");
      const profile = await store.getProfile();

      if (profile) {
        store.goTo("profile");
      }
    },

    async onFinish(userId, secret) {
      try {
        const store = Alpine.store("authModal");
        const adapter = store.adapter;

        if (!adapter) {
          throw new Error("No adapter loaded.");
        }

        if (!adapter.signInMagicUrlFinish) {
          throw new Error("Adapter does not support this method.");
        }

        await adapter.signInMagicUrlFinish(userId, secret);
      } catch (err) {
        console.error("Magic Link Issue.");
        console.error(err);
      }
    },

    async onSubmit() {
      try {
        if (this.isLoading) {
          return;
        }

        this.isLoading = true;
        this.errorMsg = null;

        const store = Alpine.store("authModal");
        const adapter = store.adapter;

        if (!adapter) {
          throw new Error("No adapter loaded.");
        }

        if (!adapter.signInMagicUrl) {
          throw new Error("Adapter does not support this method.");
        }

        await adapter.signInMagicUrl(this.email);
        store.goTo("magicUrlFinish");
      } catch (err) {
        this.errorMsg = err.message || err;
      } finally {
        this.isLoading = false;
      }
    },
  };
};
