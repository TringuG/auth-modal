(() => {
  // TODO: Load fonts

  Alpine.store("authModal", {
    opened: false,
    page: "signIn", // signIn, signUp, magicUrl, magicUrlFinish, profile

    open(page = "signIn") {
      this.opened = true;
      this.page = page;
    },

    close() {
      this.opened = false;
    },
  });

  const authModal = `
    <template x-if="$store.authModal.opened">
      <div class="fixed inset-0">
        <div class="w-full h-full relative">
          <div class="absolute inset-0 bg-black opacity-75"></div>
          <div class="relative w-full h-full">
            <template x-if="page === 'signIn">
              
            </template>

            <template x-if="page === 'singUp">
                
            </template>

            <template x-if="page === 'magicUrl">
                
            </template>

            <template x-if="page === 'magicUrlFinish">
                
            </template>

            <template x-if="page === 'profile">
                
            </template>
          </div>
        </div>
      </div>
    </template>
  `;

  document.body.insertAdjacentHTML("beforeend", authModal);
})();
