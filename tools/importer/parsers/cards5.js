/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards5) header
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Find the carousel list of cards
  const carousel = element.querySelector('.vms_carousel_container');
  if (!carousel) return;
  const ul = carousel.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  lis.forEach(li => {
    // Find the anchor (card link)
    const a = li.querySelector('a');
    if (!a) return;
    // Get the image element
    const img = a.querySelector('img');
    // Get the title inside the card
    const titleDiv = a.querySelector('.Home_from-our-blogs-heading__OIPFD');
    // Defensive: skip if no image or no title
    if (!img || !titleDiv) return;
    // Use the image element directly
    // For text, create a fragment containing a <strong> with title, hyperlinked
    const link = document.createElement('a');
    link.href = a.href;
    link.target = a.target || '_blank';
    const strong = document.createElement('strong');
    strong.textContent = titleDiv.textContent.trim();
    link.appendChild(strong);
    // For the cell, use a fragment (preserves structure)
    const frag = document.createDocumentFragment();
    frag.appendChild(link);

    rows.push([img, frag]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
