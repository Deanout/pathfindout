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

export function addNodeTypeToDatabase(payload) {
  const url = API_URL + "/addNodeType";
  return Axios.post(url, payload).then((response) => {
    return response.data;
  });
}

export function destroyAllNodeTypes() {
  const url = API_URL + "/destroyAllNodeTypes";
  return Axios.delete(url).then((response) => {
    return response.data;
  });
}
export function destroyNodeType(payload) {
  const url = API_URL + "/destroyNodeType";
  return Axios.delete(url, { data: { payload: JSON.parse(payload) } }).then(
    (response) => {
      return response.data;
    }
  );
}
