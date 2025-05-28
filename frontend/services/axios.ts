import axios from 'axios'

export const useAxios = () => {
    const { public: { apiUrl } } = useRuntimeConfig()

    const instance = axios.create({
        baseURL: apiUrl
    })
    
    return { axios: instance }
}