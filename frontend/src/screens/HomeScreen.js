import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { listProductCategories } from "../actions/productActions";
export default function HomeScreen(props) {
  const gender = props.match.params.gender;
  const categories = props.match.params.categories;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;
  let filteredProductList, pageCount;

  useEffect(() => {
    dispatch(listProductCategories(gender));
    dispatch(listProducts(gender, categories));
  }, [categories, dispatch, gender]);

  if (products) {
    //filteredData = products.filter((product) => product.gender === gender);
    //treba filtrirati podatke u mongodb-u

    //pageCount = Math.ceil(filteredData.length / productsPerPage);
    pageCount = Math.ceil(products.length / productsPerPage);
    // filteredProductList = filteredData
    //   .slice(pagesVisited, pagesVisited + productsPerPage)
    //   .map((product) => (
    //     <Product
    //       key={product.name + product.price + product._id}
    //       product={product}
    //     />
    //   ));
    if (products.length > 0) {
      filteredProductList = products
        .slice(pagesVisited, pagesVisited + productsPerPage)
        .map((product) => (
          <Product
            key={product.name + product.price + product._id}
            product={product}
          />
        ));
    }
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    handleChange();
  };

  const handleChange = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { t } = useTranslation();
  console.log(products);
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="">
            {/* <div>
              <h2>Odjeća</h2>
              <p>Majice</p>
              <p>Jakne</p>
              <p>Puloveri</p>
              <p>Hlače</p>
              <p>Traperice</p>
              <p>Košulje</p>
              <p>Donje rublje</p>
              <p>Kaputi</p>
              <p>Kupaći kostimi</p>
              <p>Pidžame</p>
              <p>Haljine</p>

              <h2>Obuća</h2>
            </div> */}
            <div className="product-container">{filteredProductList}</div>
          </div>

          <div>
            <ReactPaginate
              previousLabel={t("previous")}
              nextLabel={t("next")}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </>
      )}
    </>
  );
}
