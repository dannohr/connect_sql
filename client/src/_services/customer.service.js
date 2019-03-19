import axios from "axios";
import { authHeader } from "../_helpers";

export const customerService = {
  getAllCustomers
};

function getAllCustomers() {
  console.log("in the service");
  return axios
    .get("/api/customer", {
      headers: authHeader()
    })
    .then(response => {
      if (response.data.error === "Not authorized") {
        console.log(response.data);
        // return response.data;
      } else {
        console.log(response.data);
        return response.data;
      }
      // return await response.data;
    })
    .catch(err => {
      console.log(err);
    });
}
