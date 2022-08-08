function tocGenerator() {
  if (rte == null || [...rte.querySelectorAll("h2, h3, h4")].length === 0) return;
  const headings = [...rte.querySelectorAll("h2, h3, h4")];

  const tocList = headings.map((heading) => {
    const id = awe_convertVietnamese(heading.innerText);
    const tocListAnchor = document.createElement("a");
    tocListAnchor.dataset.name = heading.localName;
    tocListAnchor.innerText = `${heading.innerText}`;
    tocListAnchor.href = `#${id}`;
    heading.id = id;
    return tocListAnchor;
  });

  const tocOrderList = document.createElement("ol");
  tocOrderList.classList = "toc-list";
  tocList.forEach((item) => {
    const tocListElement = document.createElement("li");
    tocListElement.append(item);
    switch (item.dataset.name) {
      case "h3":
        item.parentElement.style.marginLeft = "20px";
        break;
      case "h4":
        item.parentElement.style.marginLeft = "40px";
    }
    tocOrderList.append(tocListElement);
  });

  const toc = document.createElement("div");
  toc.classList = "toc";

  const tocToggleButton = document.createElement("span");
  tocToggleButton.innerText = "[Ẩn]";
  tocToggleButton.classList = "toc-toggle-btn";
  tocToggleButton.addEventListener("click", () => {
    toc.classList.toggle("retracted");
    if (tocToggleButton.innerText === "[Ẩn]") {
      tocToggleButton.innerText = "[Hiện]";
    } else {
      tocToggleButton.innerText = "[Ẩn]";
    }
  });

  const tocHeading = document.createElement("p");
  tocHeading.classList = "toc-heading";
  tocHeading.innerText = "Nội dung chính";

  tocHeading.append(tocToggleButton);
  toc.append(tocHeading);
  toc.append(tocOrderList);

  headings[0].parentElement.insertBefore(toc, headings[0]);
}

$(document).ready(tocGenerator);
