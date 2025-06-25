/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table header
  const headerRow = ['Cards (cards4)'];
  const cells = [headerRow];
  // Find the card list (ul)
  const carouselList = element.querySelector('ul.react-multi-carousel-track');
  if (carouselList) {
    const items = carouselList.querySelectorAll('li');
    items.forEach((li) => {
      // Extract the <img> element (reference existing, do not clone)
      const img = li.querySelector('img');
      // Extract the text label inside the card (usually in div[class*=img_text] > p)
      let textContent = '';
      let textDiv = li.querySelector('.Home_Top_monsoon_container_img_text__T72dQ p');
      if (!textDiv) {
        // fallback: any p inside li
        textDiv = li.querySelector('p');
      }
      if (textDiv) {
        textContent = textDiv.textContent.trim();
      }
      // Build the right cell: bold text for title (matching example: <strong>)
      const textCell = document.createElement('div');
      if (textContent) {
        const strong = document.createElement('strong');
        strong.textContent = textContent;
        textCell.appendChild(strong);
      }
      // Add the row (image, text)
      cells.push([
        img,
        textCell
      ]);
    });
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
