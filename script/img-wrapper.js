const rte = document.querySelector(".article-content .rte");

function imagesWrapper() {
  if (rte == null || [...rte.querySelectorAll("img")].length === 0) return;
  const images = [...rte.querySelectorAll("img")];

  const imgCurrentWrapper = images.map((image) => image.parentElement);
  images.forEach((image) => {
    image.setAttribute("itemprop", "contentUrl");
  });

  const figcaptions = imgCurrentWrapper.map((element) => {
    if (element.innerText === "") {
      return "";
    } else {
      const figcaption = document.createElement("figcaption");
      figcaption.setAttribute("itemprop", "description");
      figcaption.innerText = element.innerText;
      element.innerText = "";
      return figcaption;
    }
  });

  const figures = images.map((image) => {
    const figure = document.createElement("figure");
    figure.setAttribute("itemprop", "image");
    figure.setAttribute("itemscope", "");
    figure.setAttribute("itemtype", "http://schema.org/ImageObject");
    figure.style.maxWidth = `${image.getAttribute("original-width")}px`;
    return figure;
  });

  for (let i = 0; i < figures.length; i++) {
    imgCurrentWrapper[i].parentNode.insertBefore(figures[i], imgCurrentWrapper[i]);
    figures[i].appendChild(images[i]);
    if (figcaptions[i] === "") {
      continue;
    }
    figures[i].appendChild(figcaptions[i]);
  }

  const emptyElements = [...rte.querySelectorAll(":is(p:empty, figure:empty)")];
  emptyElements.forEach((element) => {
    element.remove();
  });
}
