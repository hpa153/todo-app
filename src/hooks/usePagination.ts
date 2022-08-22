import { PaginationState } from "../redux/features/pagination/paginationSlice";

export const DOTS = "...";

const usePagination = (pages: PaginationState) => {
  // Get total amount of pages
  const numberOfPages = Math.ceil(pages.totalCount / 3);

  // Get page options to display
  let pageOptions = [] as Array<string | number>;

  if(numberOfPages === 0) {
    return [1];
  } else if(numberOfPages < 3) {
    for(let i = 1; i <= numberOfPages; i++) {
      pageOptions.push(i); // Return all pages if less than 5 pages
    }
  } else {
    if(pages.currentPage <= 2) {
      pageOptions = [1, 2, DOTS, numberOfPages]; // Return fixed options for first 2 and last 2 pages
    } else if (pages.currentPage >= numberOfPages - 1) {
      pageOptions = [1, DOTS, numberOfPages - 1, numberOfPages];
    } else {
    pageOptions = [1, DOTS, pages.currentPage, DOTS, numberOfPages]; // Always inlcude first and last page
    }
  }
  
  return pageOptions;
}

export default usePagination;
