var pageId = "forgotPasswordNew";

globalStore.pagesConfig.push({
  id: pageId,
  title: "New Password",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

globalStore[pageId] = {
  secret: "", // Set before opening modal

  password: "",
  passwordAgain: "",

  errorMsg: null,
  isLoading: false,

  async guard() {
    this.password = "";
    this.passwordAgain = "";

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

      if (!adapter.resetPasswordFinish) {
        throw new Error("Adapter does not support this method.");
      }

      await adapter.resetPasswordFinish(
        this.secret,
        this.password,
        this.passwordAgain
      );
      store.goTo("signIn");
    } catch (err) {
      this.errorMsg = err.message || err;
    } finally {
      this.isLoading = false;
    }
  },
};
