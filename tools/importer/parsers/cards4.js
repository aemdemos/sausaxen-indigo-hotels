/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as in the example
  const headerRow = ['Cards (cards4)'];
  const cells = [headerRow];

  // Find the main carousel list
  const ul = element.querySelector('ul.react-multi-carousel-track');
  if (!ul) return;
  const lis = ul.querySelectorAll('li');

  lis.forEach((li) => {
    // Image: find the <img> inside the <a>
    const a = li.querySelector('a');
    const img = a ? a.querySelector('img') : null;

    // Title: get innerText from the <p> inside .Home_Top_monsoon_container_img_text__T72dQ
    let title = '';
    let p = null;
    if (a) {
      const titleDiv = a.querySelector('.Home_Top_monsoon_container_img_text__T72dQ');
      if (titleDiv) {
        p = titleDiv.querySelector('p');
        if (p) {
          title = p.textContent.trim();
        }
      }
    }

    // Build the text cell: strong or a strong link if <a> exists
    let textCell = '';
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      if (a && a.href) {
        const link = document.createElement('a');
        link.href = a.href;
        link.target = '_blank';
        link.appendChild(strong);
        textCell = link;
      } else {
        textCell = strong;
      }
    }

    // If the card contains more than just an image and title, add that too
    // (In this HTML, only a title is present, no description or cta)
    // Add the row to the table
    cells.push([img, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
