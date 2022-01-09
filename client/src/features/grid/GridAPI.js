import Axios from "axios";

const API_URL = "http://localhost:3001";

export function getInitialGridFromAPI() {
  const url = API_URL + "/getInitialGrid";
  return Axios.get(url).then((response) => {
    return response.data;
  });
}
