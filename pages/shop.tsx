import Link from "next/link";
import React, { useState } from "react";
// import ProductItem from "../ProductItem";
// import Pagination from "../UI/Pagination";

// const sortData = (data:any, type:any) => {
//   return data.sort((a:any, b:any) => {
//     if (type === "asc") {
//       return a.price > b.price ? 1 : -1;
//     } else if (type === "desc") {
//       return a.price < b.price ? 1 : -1;
//     }
//   });
// };

function Shop(props:any) {
  const [productData, setProductData] = useState(props.products);
  const [sortProduct, setSortProduct] = useState("false");
  const [itemsPerPage] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);

  // document.title = "E-shopper-Shop";

  const searchHandler = (event:any) => {
    const enteredValue = event.target.value;
    const searchedData = props.products.filter(
      (item:any) =>
        item.name.toLowerCase().includes(enteredValue.toLowerCase()) ||
        item.price.toString().includes(enteredValue)
    );
    setProductData(searchedData);
  };

  const sortHandler = (event:any) => {
    setSortProduct(event.target.value);
  };

  const sortedProducts = sortData(productData, sortProduct);

  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const changePage = (pageNumber:any, event:any) => {
    event.preventDefault();
    setPageNumber(pageNumber);
  };

  const prevPage = (event:any) => {
    event.preventDefault();
    setPageNumber((prevState) => {
      return prevState > 1 ? prevState - 1 : prevState;
    });
  };

  const nextPage = (event:any) => {
    event.preventDefault();
    setPageNumber((prevState) => {
      return prevState < sortedProducts.length / itemsPerPage
        ? prevState + 1
        : prevState;
    });
  };

  return (
    <>
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Our Shop
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link href={"/"}>Home</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop</p>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-12">
            <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">
                Filter by price
              </h5>
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    defaultChecked
                    id="price-all"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-all"
                  >
                    All Price
                  </label>
                  <span className="badge border font-weight-normal">
                    1000
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-1"
                  >
                    $0 - $100
                  </label>
                  <span className="badge border font-weight-normal">
                    150
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-2"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-2"
                  >
                    $100 - $200
                  </label>
                  <span className="badge border font-weight-normal">
                    295
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-3"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-3"
                  >
                    $200 - $300
                  </label>
                  <span className="badge border font-weight-normal">
                    246
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-4"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-4"
                  >
                    $300 - $400
                  </label>
                  <span className="badge border font-weight-normal">
                    145
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="price-5"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-5"
                  >
                    $400 - $500
                  </label>
                  <span className="badge border font-weight-normal">
                    168
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form className="d-flex justify-content-between w-100">
                    <div className="input-group w-50">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        onChange={searchHandler}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search" />
                        </span>
                      </div>
                    </div>
                    <select
                      id="sort"
                      name="sort"
                      defaultValue={""}
                      onChange={sortHandler}
                    >
                      <option disabled value="">
                        Sort by
                      </option>
                      <option value="desc">
                        Price (high to low)
                      </option>
                      <option value="asc">
                        Price (low to high)
                      </option>
                    </select>
                  </form>
                </div>
              </div>
              {/* {currentItems.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                  subPrice={product.subPrice}
                />
              ))}
              <div className="col-12 pb-1">
                <Pagination
                  totalItems={sortedProducts.length}
                  itemsPerPage={itemsPerPage}
                  changePage={changePage}
                  prevPage={prevPage}
                  nextPage={nextPage}
                  pageNumber={pageNumber}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;