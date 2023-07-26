import React from "react";

const Row = ({ sub, idx, obj, caseChange }) => {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{caseChange(sub)}</td>
      <td>{obj[sub]}</td>
      {/* <td>Pass</td> */}
    </tr>
  );
};

export default Row;
