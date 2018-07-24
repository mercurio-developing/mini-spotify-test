import React from "react";

export default () => {
  return (
    <div>
      <img
        src={process.env.PUBLIC_URL + "/assets/spinner.gif"}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
