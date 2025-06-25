/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing the cards
  const carouselTrack = element.querySelector('ul.react-multi-carousel-track');
  if (!carouselTrack) return;
  // Get all li items (cards)
  const cards = Array.from(carouselTrack.querySelectorAll('li'));
  const rows = [['Cards (cards3)']]; // Header row as in the example

  cards.forEach((li) => {
    const a = li.querySelector('a');
    if (!a) return;
    // Get image element (direct reference)
    const img = a.querySelector('div.Home_popular_amongst_traveller_container_img__Vokqu > img');
    // Get text content
    const textDiv = a.querySelector('div.Home_popular_amongst_traveller_container_img_text__04dnh');
    let title = '', desc = '';
    if (textDiv) {
      const p = textDiv.querySelector('p');
      if (p && p.textContent) title = p.textContent.trim();
      const span = textDiv.querySelector('span');
      if (span && span.textContent) desc = span.textContent.trim();
    }
    // Compose the text cell: bold title (if present), <br>, then description (if present)
    const frag = document.createDocumentFragment();
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      frag.appendChild(strong);
      if (desc) frag.appendChild(document.createElement('br'));
    }
    if (desc) {
      frag.append(desc);
    }
    // Always include both image (or fallback) and text fragment in the row
    rows.push([img, frag]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
