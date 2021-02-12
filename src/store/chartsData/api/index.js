import axios from "axios";

export const getData = () => {
    return axios.get("http://www.randomnumberapi.com/api/v1.0/random?min=10&max=100&count=8", {
        params: {
            total: 1000,
            per_page: 8,
        }
    });
};
