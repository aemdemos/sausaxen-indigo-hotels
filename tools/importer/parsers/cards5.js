/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards5)'];

  // Find the carousel track containing the cards
  const carouselList = element.querySelector('ul.react-multi-carousel-track');
  if (!carouselList) return;

  // Get all visible card items
  const cardItems = Array.from(carouselList.querySelectorAll('li[aria-hidden="false"]'));

  // Build table rows for each card
  const rows = cardItems.map(li => {
    // The anchor tag that wraps the card
    const anchor = li.querySelector('a');
    // The image inside the card
    const img = anchor ? anchor.querySelector('img') : null;
    // The title (in a div inside the card)
    let textCellContent;
    const titleDiv = anchor ? anchor.querySelector('.Home_from-our-blogs-heading__OIPFD') : null;
    if (titleDiv) {
      // Strong element for the title
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent;
      // Put the strong inside a paragraph for structure
      const textContainer = document.createElement('div');
      textContainer.appendChild(strong);
      textCellContent = textContainer;
    } else {
      // Fallback: empty cell
      textCellContent = '';
    }
    // If the anchor wraps the card, link the text title as in the component spec
    if (anchor && textCellContent) {
      // Wrap strong/title in a link
      const link = document.createElement('a');
      link.href = anchor.href;
      link.target = anchor.target || '_blank';
      // Move all textContainer children into the link
      while (textCellContent.firstChild) {
        link.appendChild(textCellContent.firstChild);
      }
      textCellContent.appendChild(link);
    }
    return [img, textCellContent];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
