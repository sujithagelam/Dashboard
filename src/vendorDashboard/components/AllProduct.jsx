import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const productsHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/product`);
      const newProductData = await response.json();
      setProducts(newProductData.products);
      console.log(newProductData);
    } catch (err) {
      console.log("failed to fetch products",err);
      alert("failed to fetch produccts");

    }
  };
  useEffect(() => {
    productsHandler();
  },[]);
  useEffect(() => {
  console.log("Products updated:", products);
}, [products]);
  const deleteProductById = async(productId)=>{
    console.log("delete button clicked",productId)
    try{
      const response = await fetch(`${API_URL}/product/${productId}`,{
        method:'DELETE'
      })
       console.log("Status:", response.status);
       console.log("Response OK:", response.ok);
      if(response.ok)
      {
setProducts((prevProducts) =>
  prevProducts.filter((product) => product._id !== productId)
);                alert("Product delted sucesfully");

        // confirm("are you sure you want to delete");
        // window.location.reload();

      }


    }
    catch(err)
    {
      console.error(err.message);
      alert("failed to delete")
      
    }

  }

  return <div>
    {!products ? (
      <p>No products added</p>

    ):(
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
          {products.map((item)=>{
            return (
              <>
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.image && (
                  <img src={`${API_URL}/uploads/${item.image}`} 
                  alt={item.productName}
                  style={{width:'50px',height:'50px'}}
                  />
                )}
                </td>
                <td>
                  <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                </td>
              </tr>
              </>
            )

          })}
        </tbody>
      </table>

    )}

  </div>;
};

export default AllProduct;
