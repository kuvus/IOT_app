import config from '../../apiConfig.json'

import axios from 'axios'

const axiosClient = axios.create({
    baseURL: config.apiUrl,
})

export default axiosClient
