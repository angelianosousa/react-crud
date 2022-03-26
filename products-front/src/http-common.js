import axios from 'axios';

export default axios.create({
  baseURL: "https://ror-challenge-backend.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer bf664015872f91c5982765bb412c1501"
  }
})