import React from "react";

const Sidebar = ({ showFirmHandler,showProductHandler}) => {
  return <div className="sideBarSection">
    <ul>
      <li onClick={showFirmHandler}>Add Firm</li>
      <li onClick={showProductHandler}>Add product</li>
      <li>All products</li>
      <li>User Details</li>
    </ul>

  </div>;
};


export default Sidebar;
