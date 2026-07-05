import React from "react";

const Sidebar = ({ showFirmHandler,showProductHandler,showAllProductsHandler,showFrimTitle}) => {
  return <div className="sideBarSection">
    <ul>
      {showFrimTitle ? 
            <li onClick={showFirmHandler}>Add Firm</li>

      : "" }
      <li onClick={showProductHandler}>Add product</li>
      <li onClick={showAllProductsHandler}>All products</li>
      <li>User Details</li>
    </ul>

  </div>;
};


export default Sidebar;
