import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './DisplayProduct.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const DisplayProduct = ({ Counter }) => {
    const [products, setProducts] = useState([]);
    const [searchterm, setSearchterm] = useState("");
    
    useEffect(() => {
      axios.get('http://localhost:5000/products')
      .then((response) => {
        console.log("Response from /products:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching /products:", error.message);
      });
    }, []); 


  return (
    <>
      <div className="Search">
        <input id="SearchInput" type="text" placeholder="search..." onChange={(event) => {
          setSearchterm(event.target.value);
        }} />
      </div>
      <div className="Filterdata">
        {
          products.filter((val) => {
            if (searchterm === "") {
              return (
                <div className="display">
                  {products.map((product, index) => (
                    <ProductCard
                      key={index}
                      title={product.name}  // Use 'name' here instead of 'title'
                      price={product.price}
                      image={product.image}
                      Counter={Counter}
                      product={product}  // Pass the full product object
                      index={index}
                      category={product.category}  // Pass the index
                    />
                  ))}
                </div>);
            }
            else if (val.category.toLowerCase().includes(searchterm.toLowerCase())) {
              return val;
            }
          })
            .map((product, index) => (
              <ProductCard
                key={index}
                title={product.name}  // Use 'name' here instead of 'title'
                price={product.price}
                image={product.image}
                Counter={Counter}
                product={product}  // Pass the full product object
                index={index}
                category={product.category}
              />
            ))
        }
      </div>
    </>
  );

};

export default DisplayProduct;
