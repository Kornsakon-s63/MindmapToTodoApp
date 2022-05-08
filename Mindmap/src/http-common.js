import axios from "axios"; // Promise based HTTP client RESTful API

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});