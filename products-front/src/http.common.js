import axios from 'axios';

export default axios.create({
  baseURL: "https://623a728bb5292b8bfcb55026.mockapi.io",
  headers: {
    "Content-Type": "application/json"
  }
})