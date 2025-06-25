/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel container that holds the cards
  const container = element.querySelector('.Slider_ig-slider-main-container-rel__gkSMQ, #outer, .vms_carousel_container') || element;

  // Find the <ul> that contains all card <li>s
  const ul = container.querySelector('ul.react-multi-carousel-track');
  if (!ul) return;

  // Get all card <li> elements
  const lis = Array.from(ul.querySelectorAll('li.react-multi-carousel-item'));

  // Build header row
  const rows = [['Cards (cards3)']];

  // For each card, extract image and text content
  lis.forEach(li => {
    const img = li.querySelector('img');
    // Only include cards that have an image
    if (!img) return;

    // Try to find the text container in the card
    const textDiv = li.querySelector('[class*="img_text"]');
    let textCell = [];

    if (textDiv) {
      // Extract title (usually in <p>) and desc (usually in <span>)
      const titleElem = textDiv.querySelector('p');
      const descElem = textDiv.querySelector('span');

      if (titleElem) {
        const strong = document.createElement('strong');
        strong.textContent = titleElem.textContent.trim();
        textCell.push(strong);
      }
      if (descElem) {
        textCell.push(document.createElement('br'));
        textCell.push(descElem.textContent.trim());
      }
      // Fallback: if no <p> or <span>, just use text content
      if (!titleElem && !descElem && textDiv.textContent.trim()) {
        textCell.push(textDiv.textContent.trim());
      }
    } else {
      // If the text container is missing, fallback to any <p> and <span> in the li
      const titleElem = li.querySelector('p');
      const descElem = li.querySelector('span');
      if (titleElem) {
        const strong = document.createElement('strong');
        strong.textContent = titleElem.textContent.trim();
        textCell.push(strong);
      }
      if (descElem) {
        textCell.push(document.createElement('br'));
        textCell.push(descElem.textContent.trim());
      }
      // Fallback: all text
      if (!titleElem && !descElem && li.textContent.trim()) {
        textCell.push(li.textContent.trim());
      }
    }

    // Add a row: [image, textCell]
    rows.push([img, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
