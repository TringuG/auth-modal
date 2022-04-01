var pageId = "forgotPasswordFinish";

globalStore.pagesConfig.push({
  id: pageId,
  title: "Check your email inbox",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

// TODO: Implement store