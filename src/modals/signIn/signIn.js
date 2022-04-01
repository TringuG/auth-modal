var pageId = 'signIn';
var pageHtml = html['modals/' + pageId + '/' + pageId + '.html'];

var signIn = pageHtml;
var signInStore = () => {
  return {
    email: "",
    password: "",

    errorMsg: null,
    isLoading: false,

    async guard() {
      this.email = "";
      this.password = "";

      const store = Alpine.store("authModal");
      const profile = await store.getProfile();

      if (profile) {
        store.goTo("profile");
      }
    },

    async onLodingOauth(oauthAdapter) {
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

        if (!adapter.signInOauth) {
          throw new Error("Adapter does not support this method.");
        }

        await adapter.signInOauth(oauthAdapter);
      } catch (err) {
        this.errorMsg = err.message || err;
        this.isLoading = false;
      } finally {
        // this.isLoading = false;
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

        if (!adapter.signIn) {
          throw new Error("Adapter does not support this method.");
        }

        await adapter.signIn(this.email, this.password);

        store.goTo("profile");
      } catch (err) {
        this.errorMsg = err.message || err;
      } finally {
        this.isLoading = false;
      }
    },

    onSubmitOauth(adapter) {
      alert(adapter);
    },
  };
};
