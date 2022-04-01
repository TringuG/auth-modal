var pageId = "signUp";
var pageHtml = html["modals/" + pageId + "/" + pageId + ".html"];

var signUp = pageHtml;
var signUpStore = () => {
  return {
    name: "",
    email: "",
    password: "",

    errorMsg: null,
    isLoading: false,

    async guard() {
      this.name = "";
      this.email = "";
      this.password = "";

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

        if (!adapter.signUp || !adapter.signIn) {
          throw new Error("Adapter does not support this method.");
        }

        await adapter.signUp(this.name, this.email, this.password);
        await adapter.signIn(this.email, this.password);

        store.goTo("profile");
      } catch (err) {
        this.errorMsg = err.message || err;
      } finally {
        this.isLoading = false;
      }
    },
  };
};
