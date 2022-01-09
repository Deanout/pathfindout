import React, { useEffect } from "react";
import {
  selectNodeTypes,
  setNodeTypes,
  setNodeType,
  retrieveNodeTypes,
  deleteAllNodeTypesFromAPI,
  deleteNodeTypeFromAPI,
} from "./nodeTypesSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function NodeTypesList(props) {
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

  function handleClick() {
    console.log("Handling Delete Click");
    dispatch(deleteAllNodeTypesFromAPI()).then((response) => {
      dispatch(setNodeTypes(response.payload));
    });
  }
  function handleDeleteClick(event) {
    const nodeType = event.target.name;
    console.log(`Handling Delete Click for ${nodeType}`);
    dispatch(deleteNodeTypeFromAPI(nodeType)).then((response) => {
      dispatch(retrieveNodeTypes()).then((response) => {
        dispatch(setNodeTypes(response.payload));
      });
    });
  }
  function handleNodeTypeClick(id) {
    console.log(`Handling NodeType Click for ${id}`);
    dispatch(setNodeType({ id: id }));
  }

  let nodeTypes = useSelector(selectNodeTypes);
  return (
    <div>
      <h2>Node Types</h2>
      <p>
        <button onClick={() => handleClick()}>Delete All NodeTypes</button>
      </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Weight</th>
            <th>Color</th>
            <th>Select</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {nodeTypes?.nodeTypes?.map((nodeType) => (
            <tr key={`nodetype-${nodeType._id}`}>
              <td>{nodeType._id}</td>
              <td>{nodeType.name}</td>
              <td>{nodeType.weight}</td>
              <td>{nodeType.color}</td>
              <td>
                <div
                  style={{
                    border: "1px solid black",
                    backgroundColor: `${nodeType.color}`,
                    width: "1em",
                    height: "1em",
                  }}
                  onClick={() => handleNodeTypeClick(nodeType._id)}
                ></div>
              </td>
              <td>
                <button
                  name={JSON.stringify(nodeType)}
                  onClick={(event) => handleDeleteClick(event)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NodeTypesList;
