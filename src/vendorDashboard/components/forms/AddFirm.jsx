import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [firstname, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setFoffer] = useState("");
  const [file, setFile] = useState(null);

  const hadleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const handleRegionChange = (event) => {
    const value = event.target.value;

    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("user not authenticated");
      }
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);
      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("firm added succesully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setFoffer("");
        setFile(null);
      } else if (data.message == "vendor can have only frim") {
        alert("Firm exists only on firm adde");
      } else {
        alert("failed to add firm");
      }
      console.log(data.firmId);
      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add firm</h3>
        <label type="text">Firm Name</label>
        <input
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => setFirmName(e.target.value)}
        />
        <label>Area</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        {/* <label>Category</label>
        <input type="text" /> */}
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>veg</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                value="veg"
                onChange={hadleCategoryChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>non-veg</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                value="non-veg"
                onChange={hadleCategoryChange}
              />
            </div>
          </div>
        </div>
        <div className="regionInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>South-indian</label>
              <input
                type="checkbox"
                checked={region.includes("south-indian")}
                value="south-indian"
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>North-indian</label>
              <input
                type="checkbox"
                checked={region.includes("north-indian")}
                value="north-indian"
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                checked={region.includes("chinese")}
                value="chinese"
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxContainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                checked={region.includes("bakery")}
                value="bakery"
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
        <label>offer</label>
        <input
          type="text"
          name={offer}
          value={offer}
          onChange={(e) => setFoffer(e.target.value)}
        />
        <label>Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <button className="btnSubmit" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddFirm;
