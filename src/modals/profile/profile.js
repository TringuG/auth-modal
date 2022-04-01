var pageId = "profile";
var pageHtml = html["modals/" + pageId + "/" + pageId + ".html"];

var profile = pageHtml;
var profileStore = () => {
  return {
    profile: null,

    isLoading: false,
    errorMsg: null,

    async guard() {
      const store = Alpine.store("authModal");
      this.profile = await store.getProfile();

      if (!this.profile) {
        store.goTo("signIn");
      }
    },

    async logOut() {
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

        if (!adapter.logOut) {
          throw new Error("Adapter does not support this method.");
        }

        await adapter.logOut();
        await store.getProfile(true);

        store.goTo("signIn");
      } catch (err) {
        this.errorMsg = err.message || err;
      } finally {
        this.isLoading = false;
      }
    },
  };
};
