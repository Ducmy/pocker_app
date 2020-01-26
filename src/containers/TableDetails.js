import React from "react";

export const TableDetails = props => {
  // console.log(props.datalist);
  return (
    <div className="detail-list">
      {props.datalist.map((data, i) => (
        <div key={i}>{data}</div>
      ))}
    </div>
  );
};
