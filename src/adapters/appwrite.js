globalAdapters["appwrite"] = {
  sdk: null,

  oauthSuccess: null,
  oauthError: null,
  magicUrl: null,
  passwordRecoveryUrl: null,

  async setUp(config) {
    this.sdk = new Appwrite();
    this.sdk.setEndpoint(config.endpoint).setProject(config.projectId);

    this.oauthSuccess = window.authModal.oauthSuccessUrl;
    this.oauthError = window.authModal.oauthErrorUrl;
    this.magicUrl = window.authModal.magicUrlRedirect;
    this.passwordRecoveryUrl = window.authModal.passwordRecoveryRedirect;
  },

  getProviders() {
    return [
      "amazon",
      "apple",
      "bitbucket",
      "bitly",
      "box",
      "discord",
      "dropbox",
      "facebook",
      "github",
      "gitlab",
      "google",
      "linkedin",
      "microsoft",
      "notion",
      "paypal",
      "paypalSandbox",
      "salesforce",
      "slack",
      "spotify",
      "tradeshift",
      "tradeshiftBox",
      "twitch",
      "vk",
      "yahoo",
      "yammer",
      "yandex",
      "wordpress",
      "stripe",
    ];
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
    return await this.sdk.account.createOAuth2Session(
      provider,
      this.oauthSuccess,
      this.oauthError
    );
  },

  async signInMagicUrl(email) {
    return await this.sdk.account.createMagicURLSession(
      "unique()",
      email,
      this.magicUrl
    );
  },

  async signInMagicUrlFinish(userId, secret) {
    return await this.sdk.account.updateMagicURLSession(userId, secret);
  },

  async signUp(name, email, password) {
    return await this.sdk.account.create("unique()", email, password, name);
  },

  async resetPassword(email) {
    return await this.sdk.account.createRecovery(
      email,
      this.passwordRecoveryUrl
    );
  },

  async resetPasswordFinish(secret, password, passwordAgain) {
    return await this.sdk.account.updateRecovery(
      "unique()",
      secret,
      password,
      passwordAgain
    );
  },
};
