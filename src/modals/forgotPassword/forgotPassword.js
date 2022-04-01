var pageId = "forgotPassword";

globalStore.pagesConfig.push({
  id: pageId,
  title: "Forgot Password",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

// TODO: Implement store