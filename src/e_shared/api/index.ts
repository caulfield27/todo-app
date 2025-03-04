import axios from "axios";
import { BASE_URL } from "../get-env";

const strapi = axios.create({
    baseURL: BASE_URL+'/api'
});

export {strapi};