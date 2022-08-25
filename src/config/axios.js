import axios from "axios"
import config from "./Config.json"

export default axios.create({
    baseURL:config.apiBaseUrl
})