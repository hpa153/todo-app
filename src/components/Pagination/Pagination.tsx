import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import './style.scss';
import { changePage } from '../../redux/features/pagination/paginationSlice';
import { RootState } from "../../redux/store";
import usePagination, { DOTS } from '../../hooks/usePagination';
import { ThemeContext } from '../../contexts/ThemeContext';

const Pagination = () => {
  const pages = useSelector((state: RootState) => state.pagination.pages);
  const dispatch = useDispatch();
  const { theme, setTheme } = useContext(ThemeContext);
  const [textColor, setTextColor] = useState<string>(theme === "dark" ? "#d5d5d7" : "#020038");
  const paginationRange = usePagination(pages);

  useEffect(() => {
    if(theme === "dark") {
      setTextColor("#d5d5d7");
    } else {
      setTextColor("#020038");
    }
  }, [theme])

  const onPageChange = (page: number | string) => {
    dispatch(changePage(page));
  };

  return (
    <div className="component-container pagination-container shadow">
      <ul
      className="pagination-wrapper"
    >
      <li className="pagination-item">
        <button
          type="button"
          className="pagination-btn"
          style={{color: textColor}}
          onClick={() => onPageChange(pages.currentPage - 1)}
          disabled={pages.currentPage === 1 ? true : false} // Disable when on first page
        >
          <FiChevronLeft />
        </button>
      </li>

      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={idx} 
              className="dots"
              style={{color: textColor}}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={idx}
            className={`pagination-item ${pageNumber === pages.currentPage ? "pagination-btn--active" : ""}`}
            style={{color: textColor}}
          >
            <button
              type="button"
              className="pagination-btn"
              style={{color: textColor}}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="pagination-item">
        <button
          type="button"
          className="pagination-btn"
          style={{color: textColor}}
          onClick={() => onPageChange(pages.currentPage + 1)}
          disabled={pages.currentPage === Math.ceil(pages.totalCount / 3) ? true : false} // // Disable when on last page
        >
          <FiChevronRight />
        </button>
      </li>
    </ul>
    </div>
  )
}

export default Pagination;