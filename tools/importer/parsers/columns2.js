/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main search widget container
  const container = element.querySelector('.ig-search-widget-main-container, .SearchWidget_search-widget-container__7Zm9O');
  if (!container) return;

  // We'll build an array containing the four content columns in the order:
  // 1. Destination/Property 2. Check-in 3. Check-out 4. Guests/Rooms 5. Search button
  // We'll extract their main content, reference existing elements
  const fields = [];

  // 1. Destination or Property Name
  const destinationWrap = container.querySelector('.SearchWidget_input-field-container__t2VBZ');
  if (destinationWrap) {
    fields.push(destinationWrap);
  } else {
    fields.push('');
  }

  // 2. Check-in Date
  let checkinWrap = null;
  const dateFields = container.querySelectorAll('.vms_DateRangeCalendar_InputContainer');
  if (dateFields.length > 0) {
    checkinWrap = dateFields[0];
    fields.push(checkinWrap);
  } else {
    fields.push('');
  }

  // 3. Check-out Date
  let checkoutWrap = null;
  if (dateFields.length > 1) {
    checkoutWrap = dateFields[1];
    fields.push(checkoutWrap);
  } else {
    fields.push('');
  }

  // 4. Guests & Rooms
  const guestsWrap = container.querySelector('.SearchWidget_pax-selection-container__ZSUnO');
  if (guestsWrap) {
    fields.push(guestsWrap);
  } else {
    fields.push('');
  }

  // 5. Search Button
  const searchBtnWrap = container.querySelector('.SearchWidget_search-hotels-btn-container__E_PDQ');
  if (searchBtnWrap) {
    fields.push(searchBtnWrap);
  } else {
    // fallback: just the button itself if main wrapper is not there
    const searchBtn = container.querySelector('.SearchWidget_search-btn__x8_il, button[type="submit"]');
    if (searchBtn) {
      fields.push(searchBtn);
    } else {
      fields.push('');
    }
  }

  // Compose table rows: single-cell header, then a single row for the columns
  const cells = [
    ['Columns'],   // header row: exactly one cell
    fields         // second row: one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
