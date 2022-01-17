export default class EstudiantesApi
{
    static API_BASE_URL = "/apiestudiantes/v1";

    static requestHeaders(contentType = "application/json")
    {

        return {
            'Content-Type': contentType,
            "apikey": "6382535d-52dc-4cd5-ab8b-425c9da7727e"
        };
    }

    static async getAllEstudiantes()
    {
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes", {
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


    static async addEstudiante(estudiante)
    {
        console.log("EstudiantesApi.addEstudiante", estudiante);
        
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/Estudiantes", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(estudiante)
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

    static async uploadIdentificacionEstudiante(estudiante, file)
    {
        console.log("EstudiantesApi.uploadIdentificacionEstudiante", estudiante);

        let formData = new FormData();
     
        formData.append("identificacion", file);
        
        const headers1 = EstudiantesApi.requestHeaders("multipart/form-data");
        const headers = {
            "apikey": headers1.apikey,
        //     "Accept": "application/json",
        //     "Content-Type": "multipart/form-data",
        };
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiante._id+"/identificacion", {
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

    static async getIdentificacionEstudiante(estudiante)
    {
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiante._id+"/identificacion", {
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

    static async updateEstudiante(estudiante)
    {
        console.log("EstudiantesApi.updateEstudiante", estudiante);
        
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiante._id, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(estudiante)
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

    static async deleteEstudiante(estudiante)
    {
        console.log(estudiante);
        
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiante._id, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(estudiante)
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