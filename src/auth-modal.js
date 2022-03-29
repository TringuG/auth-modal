(async () => {
  const AppwriteAdapter = () => {
    return {
      sdk: null,

      oauthSuccess: null,
      oauthError: null,

      async setUp(config) {
        this.sdk = new Appwrite(config);
        this.sdk.setEndpoint(config.endpoint).setProject(config.projectId);

        this.oauthSuccess = config.oauthSuccessUrl;
        this.oauthError = config.oauthErrorUrl;
      },

      getProviders() {
        return ['amazon', 'apple', 'bitbucket', 'bitly', 'box', 'discord', 'dropbox', 'facebook', 'github', 'gitlab', 'google', 'linkedin', 'microsoft', 'notion', 'paypal', 'paypalSandbox', 'salesforce', 'slack', 'spotify', 'tradeshift', 'tradeshiftBox', 'twitch', 'vk', 'yahoo', 'yammer', 'yandex', 'wordpress', 'stripe'];
      },

      async getProfile() {
        return await this.sdk.account.get();
      },

      async logOut() {
        return await this.sdk.account.deleteSession("current");
      },

      async signIn(email, password) {
        return await this.sdk.account.createSession(email, password);
      },

      async signInOauth(provider) {
        return await this.sdk.account.createOAuth2Session(provider, this.oauthSuccess, this.oauthError);
      },

      async signInMagicLink(email) {
        return await this.sdk.account.createMagicURLSession("unique()", email);
      },

      async signUp(name, email, password) {
        return await this.sdk.account.create("unique()", email, password, name);
      },
    };
  };

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

  const providers = {
    amazon: `
    <button x-on:click="$store.authModal.signIn.onLodingOauth('amazon')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
      <img src="https://cdn.cdnlogo.com/logos/a/1/amazon-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
      <span class="mx-2 sm:inline">Sign in with Amazon</span>
    </button>
    `,
    apple: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('apple')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
        <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"/>
        </svg>
        <span class="mx-2 sm:inline">Sign in with Apple</span>
      </button>
    `,
    bitbucket: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('bitbucket')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/b/74/bitbucket-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with BitBucket</span>
      </button>
    `,
    bitly: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('bitly')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/b/57/bitly.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Bitly</span>
      </button>
    `,
    box: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('box')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/b/39/box.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Box</span>
      </button>
    `,
    discord: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('discord')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/d/38/discord.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Discord</span>
      </button>
    `,
    dropbox: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('dropbox')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/d/36/dropbox.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Dropbox</span>
      </button>
    `,
    facebook: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('facebook')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.usbrandcolors.com/images/logos/facebook-logo.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Facebook</span>
      </button>
    `,
    github: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('github')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/g/69/github-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with GitHub</span>
      </button>
    `,
    gitlab: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('gitlab')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/g/37/gitlab.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with GitLab</span>
      </button>
    `,
    google: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('google')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Google</span>
      </button>
    `,
    linkedin: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('linkedin')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/l/66/linkedin-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Linkedin</span>
      </button>
    `,
    microsoft: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('microsoft')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/m/95/microsoft.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Microsoft</span>
      </button>
    `,
    notion: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('notion')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/n/50/notion.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Notion</span>
      </button>
    `,
    paypal: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('paypal')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/p/42/paypal-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with PayPal</span>
      </button>
    `,
    paypalSandbox: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('paypalSandbox')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/p/42/paypal-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with PayPal (Box)</span>
      </button>
    `,
    salesforce: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('salesforce')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/s/3/salesforce.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Salesforce</span>
      </button>
    `,
    slack: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('slack')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/s/40/slack-new.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Slack</span>
      </button>
    `,
    spotify: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('spotify')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/s/89/spotify.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Spotify</span>
      </button>
    `,
    tradeshift: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('tradeshift')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://svgshare.com/i/fec.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Tradeshift</span>
      </button>
    `,
    tradeshiftBox: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('tradeshiftBox')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://svgshare.com/i/fec.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Tradeshift (Box)</span>
      </button>
    `,
    twitch: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('twitch')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/t/25/twitch-purple.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Twitch</span>
      </button>
    `,
    vk: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('vk')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/v/7/vk.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with VK</span>
      </button>
    `,
    yahoo: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('yahoo')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/y/53/yahoo-icon.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Yahoo</span>
      </button>
    `,
    yammer: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('yammer')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/m/11/microsoft-yammer.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Yammer</span>
      </button>
    `,
    yandex: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('yandex')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://svgshare.com/i/ff4.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Yandex</span>
      </button>
    `,
    wordpress: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('wordpress')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/w/94/wordpress-blue.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with WordPress</span>
      </button>
    `,
    stripe: `
      <button x-on:click="$store.authModal.signIn.onLodingOauth('stripe')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-black transition-colors duration-200 transform bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100">
        <img src="https://cdn.cdnlogo.com/logos/s/44/stripe.svg" class="w-4 h-4 mx-2 fill-current"></img>
        <span class="mx-2 sm:inline">Sign in with Stripe</span>
      </button>
    `
  };

  const signIn = `
<div x-init="$store.authModal.signIn.guard()">
  <form class="mt-6" @submit.prevent="$store.authModal.signIn.onSubmit()">
    <div>
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Email</label>
      <input required="required" x-model="$store.authModal.signIn.email" type="email" placeholder="admin@appwrite.io" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>
    <div class="mt-4">
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Password</label>
      <input required="required" x-model="$store.authModal.signIn.password" type="password" placeholder="Password" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>
    <div class="mt-6 flex justify-center">
      <button type="submit" x-bind:disabled="$store.authModal.signIn.isLoading" class="disabled:opacity-75 disabled:hover:bg-auth-gray-900 flex items-center justify-center space-x-2 ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
        <p>Sign In</p>
        <template hidden x-if="$store.authModal.signIn.isLoading">
          <svg
            class="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </template>
      </button>
    </div>
  </form>

  <template hidden x-if="$store.authModal.signIn.errorMsg">
    <p x-text="$store.authModal.signIn.errorMsg" class="font-light mt-6 text-center text-red-500"></p>
  </template>

  <div class="flex items-center justify-between mt-6 mb-6">
    <span class="w-2/5 border-b"></span>
    <p class="text-sm text-center text-black uppercase">or</p>
    <span class="w-2/5 border-b"></span>
  </div>

  <div class="flex items-center mb-4">
    <button x-on:click="$store.authModal.goTo('magicLink')" type="button" class="flex items-center justify-center w-full px-6 py-3 text-sm font-medium rounded-md ring-auth-gray-100 hover:bg-auth-gray-200 bg-auth-gray-100 text-auth-gray-900 focus:ring-4 hover:border-auth-gray-100 focus:bg-auth-gray-100 focus:border-auth-gray-100 focus:outline-none">
      <svg class="w-4 h-4 font-extrabold mx-2 fill-current" viewBox="0 0 24 24">
        <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/>
      </svg>
      <span class="mx-2 sm:inline">Sign in with Magic Link</span>
    </button>
  </div>

  <template x-if="$store.authModal.allowedOauthProviders.length > 0">
    <div class="grid grid-cols-12 gap-4">
      <template x-for="provider in $store.authModal.allowedOauthProviders">
        <div x-html="provider" class="col-span-6"></div>
      </template>
    </div>
  </template>

  <div class="mt-8 text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
    <p class="">Don't have an account?</p>
    <button type="button" x-on:click="$store.authModal.goTo('signUp')" class="font-medium text-brand-600 underline hover:text-brand-900">
      Create One
    </button>
  </div>
</div>
  `;

  const signUp = `
<div x-init="$store.authModal.signUp.guard()">
  <form class="mt-6" @submit.prevent="$store.authModal.signUp.onSubmit()">
    <div>
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Name</label>
      <input x-model="$store.authModal.signUp.name" required="required" type="text" placeholder="John Walker" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-4">
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Email</label>
      <input x-model="$store.authModal.signUp.email" required="required" type="email" placeholder="admin@appwrite.io" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-4">
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Password</label>
      <input x-model="$store.authModal.signUp.password" required="required" type="password" placeholder="Password" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-6 flex justify-center">
      <button type="submit" x-bind:disabled="$store.authModal.signUp.isLoading" class="disabled:opacity-75 disabled:hover:bg-auth-gray-900 flex items-center justify-center space-x-2 ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
        <p>Sign Up</p>
        <template hidden x-if="$store.authModal.signUp.isLoading">
          <svg
            class="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </template>
      </button>
    </div>

    <template hidden x-if="$store.authModal.signUp.errorMsg">
      <p x-text="$store.authModal.signUp.errorMsg" class="font-light mt-6 text-center text-red-500"></p>
    </template>
  </form>

  <div class="mt-8 text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
    <p class="">Already have an account?</p>
    <button type="button" x-on:click="$store.authModal.goTo('signIn')" class="font-medium text-brand-600 underline hover:text-brand-900">
      Sign In
    </button>
  </div>
</div>
  `;

  const magicLink = `
<div>
  <form class="mt-6">
    <div>
      <label class="text-auth-gray-900 mb-2 block text-sm font-medium">Email</label>
      <input type="email" placeholder="admin@appwrite.io" class="bg-auth-gray-100 ring-auth-gray-800 block rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-1 p-4 w-full">
    </div>

    <div class="mt-6 flex justify-center">
      <button type="button" x-on:click="$store.authModal.goTo('magicLinkFinish')" class="ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
        Send Magic Link
      </button>
    </div>
  </form>

  <div class="mt-8 text-xs text-center text-gray-600 flex items-center justify-center space-x-1">
    <p class="">Already have an account?</p>
    <button type="button" x-on:click="$store.authModal.goTo('signIn')" class="font-medium text-brand-600 underline hover:text-brand-900">
      Sign In
    </button>
  </div>
</div>
  `;

  const magicLinkFinish = `
<div>
  <p class="text-sm text-gray-500 mb-2">We emailed a magic link to </p>
  <p class="text-lg font-bold text-black mb-2">admin@appwrite.io</p>
  <p class="text-sm text-gray-500 mb-2">Click the link to log in or sign up.</p>
</div>
  `;

  const profile = `
<div x-data x-init="$store.authModal.profile.guard()">
  <template x-if="$store.authModal.profile.profile">
    <div>
      <p class="text-sm text-gray-500 mb-2">Logged in as</p>
      <p>
        <span x-text="$store.authModal.profile.profile.name" class="text-lg text-black"></span>
        <span class="text-auth-gray-400">at</span>
        <span x-text="$store.authModal.profile.profile.email" class="text-lg text-black"></span>
      </p>
      
      <div class="mt-6 flex justify-center">
        <button x-on:click="$store.authModal.profile.logOut()" x-bind:disabled="$store.authModal.profile.isLoading"  type="button" class="disabled:opacity-75 disabled:hover:bg-auth-gray-900 flex items-center justify-center space-x-2 ring-auth-gray-200 bg-auth-gray-900 rounded-lg px-12 py-3 w-full font-bold text-white hover:bg-black focus:ring-4">
          <p>Log Out</p>
          <template hidden x-if="$store.authModal.profile.isLoading">
            <svg
              class="w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </template>
        </button>
      </div>

      <template hidden x-if="$store.authModal.profile.errorMsg">
        <p x-text="$store.authModal.profile.errorMsg" class="font-light mt-6 text-center text-red-500"></p>
      </template>
    </div>
  </template>
</div>
`;

  const profileStore = () => {
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

  const signInStore = () => {
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

  const signUpStore = () => {
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

  Alpine.store("authModal", {
    signIn: signInStore(),
    signUp: signUpStore(),
    profile: profileStore(),

    allowedOauthProviders: [],

    accountProfile: null,

    adapter: null,

    opened: false,
    currentPage: null,

    // TODO: profile
    pagesConfig: [
      {
        id: "signIn",
        title: "Sign In",
        template: signIn,
      },
      {
        id: "signUp",
        title: "Sign Up",
        template: signUp,
      },
      {
        id: "magicLink",
        title: "Sign In with Magic Link",
        template: magicLink,
      },
      {
        id: "magicLinkFinish",
        title: "Check your email inbox",
        template: magicLinkFinish,
      },
      {
        id: "profile",
        title: "My Account",
        template: profile,
      },
    ],

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

      switch (adapter) {
        case "appwrite":
          this.adapter = AppwriteAdapter();
          break;
        default:
          throw new Errror("Adapter not supported by Auth Modal.");
      }

      await this.adapter.setUp(config);

      this.allowedOauthProviders = [];
      const adapterProviders = this.adapter.getProviders();
      const allowedProviders = Object.keys(providers).filter((provider) => adapterProviders.includes(provider)).filter((provider) => oauths.includes(provider));
      this.allowedOauthProviders = allowedProviders.map((provider) => providers[provider]);
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

  const authModal = `
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
  const store = Alpine.store("authModal");
  store.getProfile(true);
})();
