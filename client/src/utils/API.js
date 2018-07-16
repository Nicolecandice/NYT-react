import axios from "axios";
import filterParams from "./filterParams";

export default {
  // Gets all books
  getArticle: function (params) {
    return axios.get("/nyt", { params: filterParams(params) });
  },
  // Gets the book with the given id
  getSavedArticle: function () {
    return axios.get("/api/article");
  },
  // Deletes the book with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/article/" + id);
  },
  saveArticle: function (articleData) {
    return axios.post("/api/article/", articleData);
  },
};
