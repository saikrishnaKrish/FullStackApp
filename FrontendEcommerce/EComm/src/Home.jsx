import { useState } from "react";
import ProductList from "./components/ProductList";
import Categories from "./Categories";
import useFetchData from "./Utility/useFetchData";
import basicOps from "./Utility/basixOps";
import { usePaginationContext } from "./contexts/usePaginationContext";
import "./Home.css";
import PaginationComponent from "./components/PaginationComponent";
import SearchBarComponent from "./components/SearchBarComponent";
import { useThemeContext } from "./contexts/useThemeContext";
import URL from './urlConfig';


const Home = () => {

  const { toggleTheme, theme } = useThemeContext();

  const FETCH_PRODUCTS_URL = URL.GET_PRODUCTS_URL;
  const FETCH_CATEGORIES_URL = URL.GET_CATEGORIES;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortDir, setsortDir] = useState(0);
  const [currCategory, setCurrCategory] = useState("All categories");

  const { data: pData } = useFetchData(FETCH_PRODUCTS_URL);
  const { data: cData } = useFetchData(FETCH_CATEGORIES_URL, []);
 
  const { pageSize, pageNum, setPageNum } = usePaginationContext();
  let productList = [];

  if (pData) {
    productList = pData.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image,
      ...product
    }));
  }


  const object = basicOps(
    productList,
    searchTerm,
    sortDir,
    currCategory,
    pageNum,
    pageSize
  );

  console.log("products",productList)
  const totalPages = object?.totalPages;
  const filteredSortedgroupByArr = object?.filteredSortedGroupByArr;

  return (
    <>
      <header
        className="nav_wrapper"
        style={
          theme === "dark"
            ? { backgroundColor: "#cb993e" }
            : { backgroundColor: "#18184e" }
        }
      >
        <div className="search_sortWrapper">
          <SearchBarComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setsortDir={setsortDir}
          />
          <button onClick={toggleTheme}>Toggle</button>
        </div>
        <div className="categories_wrapper">
          {cData?.length > 0 && (
            <Categories categories={cData } setCurrCategory={setCurrCategory} currCategory={currCategory} />
          )}
        </div>
      </header>

      <main
        className="product_wrapper"
        style={
          theme === "dark"
            ? { backgroundColor: "#f2f2f2" }
            : { backgroundColor: "#f2dea8" }
        }
      >
        {pData?.length > 0 && cData?.length > 0 && (
          <ProductList productList={filteredSortedgroupByArr} />
        )}
      </main>

      {totalPages && filteredSortedgroupByArr && (
        <PaginationComponent
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Home;
