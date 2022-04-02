var pageId = "forgotPassword";

globalStore.pagesConfig.push({
  id: pageId,
  title: "Forgot Password",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

globalStore[pageId] = {
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

      if (!adapter.resetPassword) {
        throw new Error("Adapter does not support this method.");
      }

      await adapter.resetPassword(this.email);
      store.goTo("forgotPasswordFinish");
    } catch (err) {
      this.errorMsg = err.message || err;
    } finally {
      this.isLoading = false;
    }
  },
};
