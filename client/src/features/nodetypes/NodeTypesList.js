import React, { useEffect } from "react";
import {
  selectNodeTypes,
  setNodeTypes,
  retrieveNodeTypes,
} from "./nodeTypesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function NodeTypesList(props) {
  console.log(props);
  useEffect(() => {
    dispatch(retrieveNodeTypes())
      .then((response) => {
        return response.payload;
      })
      .then((response) => {
        dispatch(setNodeTypes(response));
      });
  }, []);
  const dispatch = useDispatch();

  let nodeTypes = useSelector(selectNodeTypes);
  return (
    <div>
      <h2>Node Types</h2>
      <ul>
        {nodeTypes?.nodeTypes?.map((nodeType, index) => (
          <li key={`nodetype-${index}`}>{nodeType.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NodeTypesList;
