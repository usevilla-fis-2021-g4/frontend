export default class ProfesoresApi
{
    static API_BASE_URL = "/apiprofesores/v1";

    static requestHeaders(contentType = "application/json")
    {

        return {
            'Content-Type': contentType,
            "apikey": "6382535d-52dc-4cd5-ab8b-425c9da7727e"
        };
    }

    static async getAllProfesores()
    {
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores", {
            method: "GET",
            headers: headers
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }

        return response.json();
    }

    static async getNewPassword()
    {
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/password", {
            method: "GET",
            headers: headers
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }

        return response.json();
    }

    static async addProfesor(profesor)
    {
        console.log("ProfesoresApi.addProfesor", profesor);
        
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(profesor)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }        

        return response;
    }

    static async uploadIdentificacionProfesor(profesor, file)
    {
        console.log("ProfesoresApi.uploadIdentificacionProfesor", profesor);

        let formData = new FormData();
     
        formData.append("identificacion", file);
        
        const headers1 = ProfesoresApi.requestHeaders("multipart/form-data");
        const headers = {
            "apikey": headers1.apikey,
        //     "Accept": "application/json",
        //     "Content-Type": "multipart/form-data",
        };
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores/"+profesor._id+"/identificacion", {
            method: "POST",
            headers: headers,
            body: formData
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }        

        return response;
    }

    static async getIdentificacionProfesor(profesor)
    {
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores/"+profesor._id+"/identificacion", {
            method: "GET",
            headers: headers
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }

        return response.json();
    }

    static async updateProfesor(profesor)
    {
        console.log("ProfesoresApi.updateProfesor", profesor);
        
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores/"+profesor._id, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(profesor)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }        

        return response;
    }

    static async deleteProfesor(profesor)
    {
        console.log(profesor);
        
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores/"+profesor._id, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(profesor)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("pasó por la excepcion");
            throw Error(response.statusText);
        }   

        return response;
    }

}