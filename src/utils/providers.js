var files = Object.keys(html).filter((file) => file.startsWith('utils/providers/'));
for(const file of files) {
  const key = file.split("utils/providers/").join("").split(".html").join("");
  globalProviders[key] = html[file];
}
