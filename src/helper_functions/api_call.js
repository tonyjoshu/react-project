import axios from "axios";

const apiCall = async ({
  tokenRequired = false,
  method = "get",
  url,
  body,
  config,
  formData = false
}) => {
  if (tokenRequired) {
    if (method === "get") return axios.get(url, config);
    if (method === "post") return axios.post(url, body, config);
    if (method === "put") return axios.put(url, body, config);
    if (method === "delete") return axios.delete(url, config);
    if(formData) return axios.post(url, body, {...config, "Content-Type": "multipart/form-data" });
  } else {
    if (method === "get") return axios.get(url);
    if (method === "post") return axios.post(url, body);
    if (method === "delete") return axios.delete(url, body);
  }
};

export default apiCall;
