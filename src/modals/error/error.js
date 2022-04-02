var pageId = "error";

globalStore.pagesConfig.push({
  id: pageId,
  title: "Whoops, a problem!",
  template: html["modals/" + pageId + "/" + pageId + ".html"],
});

globalStore[pageId] = {
  errorMsg: null,
};
