import axios from 'axios';

export default axios.create({
  baseURL: "https://ror-challenge-backend.herokuapp.com",
  headers: {
    "Content-Type": "application/json"
  }
})