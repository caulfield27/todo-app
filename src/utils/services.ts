import axios from "axios";
const base_url = process.env.BASE_URL
const instance = axios.create({baseURL: `${base_url}/api`})

export {instance}