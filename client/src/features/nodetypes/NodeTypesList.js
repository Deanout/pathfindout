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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveNodeTypes())
      .then((response) => {
        return response.payload;
      })
      .then((response) => {
        dispatch(setNodeTypes(response));
      });
  }, [dispatch]);

  let nodeTypes = useSelector(selectNodeTypes);
  console.log(nodeTypes);
  return (
    <div>
      <h2>Node Types</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {nodeTypes?.nodeTypes?.map((nodeType) => (
            <tr key={`nodetype-${nodeType._id}`}>
              <td>{nodeType._id}</td>
              <td>{nodeType.name}</td>
              <td>{nodeType.weight}</td>
              <td>{nodeType.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NodeTypesList;
