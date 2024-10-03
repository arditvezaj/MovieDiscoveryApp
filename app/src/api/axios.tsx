import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQzOGFhZDBlZDRkNzcxYjIzNWFmNWZmN2ZmNzk4NSIsIm5iZiI6MTcyNzg2Nzg1OS42ODA1NzgsInN1YiI6IjY2NDVjNWQyZjAyY2VlM2Q5ZTFjYjM3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3EiSXrQ4pk4fp2PUBSmwk0EZOvpH89BHK31YPUnpob4",
  },
  params: {
    apiKey: "1d438aad0ed4d771b235af5ff7ff7985",
  },
});
