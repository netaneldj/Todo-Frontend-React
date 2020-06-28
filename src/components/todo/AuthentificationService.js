import axios from 'axios'
import {API_URL, JPA_API_URL} from '../../Constants.js'

export const USER_AUTHENTIFICATION_NAME = 'authenticatedUser'

class AuthentificationService {

    executeBasicAuthentificationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    executeJwtAuthentificationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username,password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username,password) {
        sessionStorage.setItem(USER_AUTHENTIFICATION_NAME,username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_AUTHENTIFICATION_NAME,username);
        this.setupAxiosInterceptors(this.createJWTToken(token))        
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_AUTHENTIFICATION_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_AUTHENTIFICATION_NAME)
        if (user===null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_AUTHENTIFICATION_NAME)
        if (user===null) return ''
        return user
    }    

    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthentificationService()