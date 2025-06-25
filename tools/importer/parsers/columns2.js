/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container that holds the search widget sections
  const mainContainer = element.querySelector('.ig-search-widget-main-container');
  if (!mainContainer) return;

  // Prepare an array for the columns
  const columns = [];

  // 1. Destination or Property Name (leftmost column)
  const destination = mainContainer.querySelector('.SearchWidget_input-field-container__t2VBZ');
  if (destination) columns.push(destination);

  // 2. Check-in and Check-out columns (two columns)
  const dateInputs = mainContainer.querySelectorAll('.vms_DateRangeCalendar_InputContainer');
  dateInputs.forEach(input => {
    columns.push(input);
  });

  // 3. No. of Guests & Rooms
  const guests = mainContainer.querySelector('.SearchWidget_pax-selection-container__ZSUnO');
  if (guests) columns.push(guests);

  // 4. Search Button
  const searchBtnContainer = mainContainer.querySelector('.SearchWidget_search-hotels-btn-container__E_PDQ');
  if (searchBtnContainer) columns.push(searchBtnContainer);

  // If any columns are missing, fallback to the immediate children of mainContainer
  let columnRow = columns;
  if (columns.length < 5) {
    columnRow = Array.from(mainContainer.children);
  }

  // The header row should be a single column with 'Columns'
  // The second row should have the extracted columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns'],
    columnRow
  ], document);

  element.replaceWith(table);
}
