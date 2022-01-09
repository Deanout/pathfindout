import Axios from "axios";

const API_URL = "http://localhost:3001";

export function getInitialGridFromAPI() {
  const url = API_URL + "/getInitialGrid";
  console.log("Requesting data from " + url);
  return Axios.get(url).then((response) => {
    return response.data;
  });
}
