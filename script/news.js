var head = document.getElementsByTagName("head")[0];
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "https://cdn.jsdelivr.net/gh/Ayden51/StudyCare-Website@0.23/css/news.min.css";
head.appendChild(link);

function grammarScrollToView() {
  if (!!document.querySelector("#grammar-table") === false) return;
  const tableBody = document.querySelector("tbody");
  const tableRows = tableBody.querySelectorAll("tr");
  tableRows.forEach((row) => {
    row.addEventListener("click", () => {
      let rowId = row.id;
      let anchorSelector = `a[href^="#${rowId}"]`;
      let grammarAnchor = document.querySelector(anchorSelector);
      grammarAnchor.scrollIntoView();
    });
  });
}
grammarScrollToView();
