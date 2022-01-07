import Axios from "axios";

const API_URL = "http://localhost:3001";

export function getNodeTypesFromAPI() {
  const url = API_URL + "/getNodeTypes";
  return Axios.get(url).then((response) => {
    return response.data;
  });
}

export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function addNodeType(nodeType) {
  return async (dispatch) => {
    const response = await Axios.post("/api/nodetypes");
    dispatch(addNodeType(response.data));
  };
}
