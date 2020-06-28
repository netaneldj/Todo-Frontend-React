import axios from 'axios'
import {API_URL} from '../../Constants.js'

class HelloWorldService {
    excecuteHelloWorldService() {
        return axios.get(`${API_URL}/hello-world`);
    }

    excecuteHelloWorldBeanService() {
        return axios.get(`${API_URL}/hello-world-bean`);
    }    

    excecuteHelloWorldPathVariableService(name) {

        return axios.get(`${API_URL}/hello-world/path-variable/${name}`);
    }        
}
export default new HelloWorldService()