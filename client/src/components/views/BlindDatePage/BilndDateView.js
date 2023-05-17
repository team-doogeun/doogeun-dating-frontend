import React, { useEffect } from "react";
import { DataFetchingComponent } from "./BlindDataContainer";

function BlindDateView(data) {
  useEffect(() => {
    console.log(data);
  }, []);

  return <div></div>;
}

export default BlindDateView;
