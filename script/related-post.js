async function getData(url, type = "json") {
  const response = await fetch(url);
  switch (type) {
    case "xml": {
      const parser = new DOMParser();
      const xml = parser.parseFromString(await response.text(), "application/xml");
      return xml;
    }
    case "html": {
      const html = document.createElement("html");
      html.innerHTML = await response.text();
      const fragment = new DocumentFragment();
      fragment.append(html);
      return fragment;
    }
    default: {
      return await response[type]();
    }
  }
}
const xml = await getData("https://studycare.edu.vn/sitemap_blogs_1.xml", "xml").catch(console.error);
const urlsElement = [...xml.querySelectorAll("url")];
const urls = urlsElement.map((element) => {
  const children = [...element.childNodes];
  return children[0].textContent;
});
urls.splice(0, 39);
urls.splice(417, 13);

let snippets = [];
for (let i = 0; i < urls.length; i++) {
  const fragment = await getData(urls[i], "html");
  const breadCrump = fragment.querySelector(".bread-crumb .breadcrumb li:nth-child(2) a");
  const category = breadCrump.textContent;
  const article = fragment.querySelector("article.article-main");
  const thumbnail = article.querySelector('meta[itemprop="image"]').content;
  const headline = article.querySelector('meta[itemprop="headline"]').content;
  const description = article.querySelector('meta[itemprop="description"]').content;
  snippets.push({ category, headline, description, thumbnail });
}
console.log(JSON.stringify(snippets));
items.sort(function (a, b) {
  const categoryA = a.category.toUpperCase(); // ignore upper and lowercase
  const categoryB = b.category.toUpperCase(); // ignore upper and lowercase
  const headlineA = a.headline.toUpperCase(); // ignore upper and lowercase
  const headlineB = b.headline.toUpperCase(); // ignore upper and lowercase
  if (categoryA < categoryB) {
    return -1;
  }
  if (categoryA > categoryB) {
    return 1;
  }
  if (categoryA === categoryB) {
    if (headlineA < headlineB) {
      return -1;
    }
    if (headlineA > headlineB) {
      return 1;
    }

    // names must be equal
    return 0;
  }
});
