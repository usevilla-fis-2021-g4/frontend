import axios from "axios";

class LoginService {
    baseURL = process.env.DEVELOPER ? 
                "http://localhost:8083/api/v1" : 
                "https://authentication-service-bablybaqrtasri.cloud.okteto.net/api/v1";
                
    http = axios.create({baseURL: this.baseURL});

    login = (data) =>  {
        return this.http.post('/login', {...data})
    }

    logout = (data) => {
        return this.http.post("/logout", {data : data});
    }
}

export default new LoginService();