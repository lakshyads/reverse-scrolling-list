import { initialData, totalInitialRecords } from './data.utils';

export const getTotalExistingPagesByPageSize = (pageSize = 0) => {
  if (pageSize === 0) return 0;
  return Math.ceil(totalInitialRecords / pageSize);
};

export const fetchDataByPage = (page, pageSize) => {
  // Check if requested page exists
  if (page > getTotalExistingPagesByPageSize(pageSize))
    throw new Error('Page does not exist');

  // Fetch data for requested page
  const firstRecordIndexForThisPage = 0 - page * pageSize;
  return initialData.slice(firstRecordIndexForThisPage);
};
