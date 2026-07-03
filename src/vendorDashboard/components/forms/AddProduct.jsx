import React from "react";
import { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setbestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDesc] = useState("");
  const hadleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handlebestSeller = (event) => {
    const value = event.target.value === "true";
    setbestSeller(value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if (!loginToken || !firmId) {
        console.log("user not authenticated");
      }
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("bestSeller", bestSeller);
      category.forEach((value) => {
        formData.append("category", value);
      });
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("product added sucessfully");
      }
    } catch (err) {
      console.error(err.message);
      alert("Failed to add product");
    }
  };

  return (
    <div className="productSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                onChange={hadleCategoryChange}
                value="veg"
              />
            </div>
            <div className="checkboxContainer">
              <label>non-veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                onChange={hadleCategoryChange}
                value="non-veg"
              />
            </div>
          </div>
        </div>
        <label>Image</label>
        <input type="file" onChange={handleImageUpload} />
        <div className="checkInpu">
          <label>Best seller</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>yes</label>
              <input
                type="radio"
                value="true"
                checked={bestSeller === true}
                onChange={handlebestSeller}
              />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input
                type="radio"
                checked={bestSeller === false}
                value="false"
                onChange={handlebestSeller}
              />
            </div>
          </div>
        </div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="btnSubmit" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
