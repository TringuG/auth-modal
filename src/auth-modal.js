// TODO: Fix jsDeliver build
// TODO: Finish forgotPassword

(async () => {
  // Setup fonts and colors
  document.body.insertAdjacentHTML(
    "beforeend",
    `<style> @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');</style>`
  );

  tailwind.config = tailwind.config || {};
  tailwind.config = {
    ...tailwind.config,
    theme: {
      extend: {
        colors: {
          "auth-gray": {
            50: "#f6f9fe",
            100: "#eef4fc",
            200: "#dce5f6",
            300: "#c2d0ea",
            400: "#869bc6",
            500: "#556b9a",
            600: "#3a4d76",
            700: "#263962",
            800: "#132146",
            900: "#040d30",
          },
        },
      },
    },
  };

  var alpineStore = Object.assign({}, globalStore, {
    // Defined by other files

    allowedOauthProviders: [],
    adapter: null,
    opened: false,
    currentPage: null,
    accountProfile: null,

    async getProfile(force = false) {
      if (this.accountProfile && !force) {
        return this.accountProfile;
      }

      try {
        this.accountProfile = await this.adapter.getProfile();
      } catch (err) {
        this.accountProfile = null;
      }

      return this.accountProfile;
    },

    async init() {
      this.goTo("signIn");

      await this.prepareAdapter();
    },

    async prepareAdapter() {
      const { config, adapter } = window.authModal;
      const oauths = window.authModal.oauths || [];

      this.adapter = globalAdapters[adapter];
      await this.adapter.setUp(config);

      this.allowedOauthProviders = [];
      const adapterProviders = this.adapter.getProviders();
      const allowedProviders = Object.keys(globalProviders)
        .filter((provider) => adapterProviders.includes(provider))
        .filter((provider) => oauths.includes(provider));
      this.allowedOauthProviders = allowedProviders.map(
        (provider) => globalProviders[provider]
      );
    },

    open(page) {
      this.opened = true;

      if (page) {
        this.goTo(page);
      }
    },

    close(reset = true) {
      this.opened = false;

      if (reset) {
        this.goTo("signIn");
      }
    },

    goTo(page) {
      this.currentPage = this.pagesConfig.find((p) => p.id === page);
    },
  });

  // Define Alpine.js stores
  Alpine.store("authModal", alpineStore);

  // Insert Auth Modal
  var authModal = `
  <template x-if="$store.authModal.opened">
    <div class="fixed inset-0" style="font-family: 'Montserrat', sans-serif;">
      <div class="w-full h-full relative">
        <div class="absolute inset-0 bg-black opacity-50" x-on:click="$store.authModal.close()"></div>
        <div class="relative w-full h-full pt-10 overflow-y-auto pb-10" x-on:click="$store.authModal.close()">
          <div class="mx-auto w-full max-w-2xl rounded-xl bg-white p-6" x-on:click="$event.stopPropagation()">
            <div class="flex justify-between items-center">
              <h1 class="text-auth-gray-900 mb-4 text-2xl font-bold" x-text="$store.authModal.currentPage.title"></h1>
              <button type="button" x-on:click="$store.authModal.close()" class="p-3 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </button>
            </div>
            <div class="mt-6">
              <div x-html="$store.authModal.currentPage.template"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    `;

  document.body.insertAdjacentHTML("beforeend", authModal);

  // To ensure we show profile if already logged in, without waiting
  // Fetch profile on background when page loads
  var storeSnapshot = Alpine.store("authModal");
  storeSnapshot.getProfile(true);

  // Magic URL functionality
  var urlSearchParams = new URLSearchParams(window.location.search);
  var params = Object.fromEntries(urlSearchParams.entries());
  if (params.userId && params.secret) {
    var storeSnapshot = Alpine.store("authModal");
    storeSnapshot.magicUrl.onFinish(params.userId, params.secret).then(() => {
      storeSnapshot.getProfile(true);
    });
  }
})();
