function grammarTable() {
  if (rte == null || rte.querySelector("#grammar-table") == null) return;
  const supTagList = [...rte.querySelectorAll("strong sup")];
  const grammarAnchorList = supTagList.map((item) => item.parentElement);
  grammarAnchorList.forEach((item) => {
    item.style.color = "#0d65e7";
    item.style.cursor = "pointer";
    item.addEventListener("mouseover", () => {
      item.style.textDecoration = "underline";
    });
    item.addEventListener("mouseout", () => {
      item.style.textDecoration = "none";
    });
  });
  const tableRows = [...rte.querySelectorAll("#grammar-table tbody tr")];
  for (let i = 0; i < tableRows.length; i++) {
    grammarAnchorList[i].addEventListener("click", () => {
      tableRows[i].scrollIntoView();
    });
    tableRows[i].addEventListener("click", () => {
      grammarAnchorList[i].scrollIntoView();
    });
  }
}
$(document).ready(grammarTable);
