import axios from "axios";
import { createContext, use, useContext, useState } from "react";

const DataContext = createContext(null);

function DataProvider({ children }) {
  const [data, setData] = useState([]);

  //   fetchind all products from API
  async function fetchAllProducts() {
    try {
      // const res = await axios.get("https://fakestoreapi.com/products");
      const res = await axios.get("https://dummyjson.com/products?limit=150");
      const productsData = await res.data.products;
      console.log(productsData);
      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  }

  function getUniqueCategory(data, property) {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });
    newVal = ["All", ...new Set(newVal)];
    return newVal;
  }

  const categoryOnlyData = getUniqueCategory(data, "category");
  // console.log(categoryOnlyData);
  const brandOnlyData = getUniqueCategory(data, "brand");

  return (
    <DataContext.Provider
      value={{ data, setData, fetchAllProducts, categoryOnlyData,brandOnlyData }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { DataProvider, useData };

//getData = useData
