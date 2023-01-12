import React from "react";


interface PaginationProps {
  itemsPerPage: Number,
  totalItems: Number,
  changePage: Function,
  prevPage: Function,
  nextPage: Function,
  pageNumber: Number,
} 
function Pagination({
  itemsPerPage,
  totalItems,
  changePage,
  prevPage,
  nextPage,
  pageNumber,
}: PaginationProps) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }
  

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mb-3">
        <li
          className={`page-item previous_btn ${pageNumber <= 1 ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={prevPage}
          >
            <span>Previous</span>
          </button>
        </li>
        {pages.map((number) => (
          <li
            className={`page-item pages ${pageNumber === number ? "active" : ""
              }`}
            key={number}
            onClick={changePage.bind(null, number)}
          >
            <button
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item next_btn ${pageNumber >= pages.length ? "disabled" : ""
            }`}
        >
          <button
            className="page-link"
            onClick={nextPage}
          >
            <span>Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;