var pageId = "forgotPasswordNew";

globalStore.pagesConfig.push({
  id: pageId,
  title: "New Password",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

// TODO: Implement store