import React from "react";

function Pagination({
  itemsPerPage,
  totalItems,
  changePage,
  prevPage,
  nextPage,
  pageNumber,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center mb-3">
        <li
          className={`page-item ${pageNumber <= 1 ? "disabled" : ""}`}
        >
          <a
            className="page-link"
            href="javscript:void(0)"
            onClick={prevPage}
          >
            <span>Previous</span>
          </a>
        </li>
        {pages.map((number) => (
          <li
            className={`page-item pages ${pageNumber === number ? "active" : ""
              }`}
            key={number}
          >
            <a
              className="page-link"
              href="javscript:void(0)"
              onClick={changePage.bind(null, number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${pageNumber >= pages.length ? "disabled" : ""
            }`}
        >
          <a
            className="page-link"
            href="javscript:void(0)"
            onClick={nextPage}
          >
            <span>Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;