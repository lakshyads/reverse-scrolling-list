import { initialData, totalInitialRecords } from './data.utils';

export const getTotalExistingPagesByPageSize = (pageSize = 0) => {
  if (pageSize === 0) return 0;
  return Math.ceil(totalInitialRecords / pageSize);
};

export const fetchDataByPage = (page, pageSize) => {
  // Check if requested page exists
  if (page > getTotalExistingPagesByPageSize(pageSize))
    throw new Error(`Requested Page ${page} does not exist`);

  // Fetch data for requested page
  const calc = page * pageSize;
  const totalRecordsOnThisPage =
    calc <= totalInitialRecords ? pageSize : calc - totalInitialRecords;
  const firstRecordIndexForThisPage = 0 - calc;
  const lastRecordIndexForThisPage =
    firstRecordIndexForThisPage + totalRecordsOnThisPage;
  sleep(2000);
  if (page === 1) {
    return initialData.slice(firstRecordIndexForThisPage);
  }
  return initialData.slice(
    firstRecordIndexForThisPage,
    lastRecordIndexForThisPage
  );
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
