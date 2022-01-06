export default class EstudiantesApi
{
    static API_BASE_URL = "/apiestudiante/v1";

    static requestHeaders(contentType = "application/json")
    {

        return {
            'Content-Type': contentType,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFkNGI4NzRmNDQ5ZDVkMjEyZjM4NmY4IiwiZW1haWwiOiJ1bmRlendlbGZpQGdtYWlsLmNvbSIsImlhdCI6MTY0MTMzMDgyOCwiZXhwIjoxNjQxMzM0NDI4fQ.YZ23FGj1hx665XRTXfXeOhyKMGyFkr0fiA22xIkdU_k"
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

    static async getNewPassword()
    {
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/password", {
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

    static async addEstudiante(estudiadnte)
    {
        console.log("EstudiantesApi.addEstudiante", estudiadnte);
        
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(estudiadnte)
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

    static async uploadIdentificacionEstudiante(estudiadnte, file)
    {
        console.log("EstudiantesApi.uploadIdentificacionEstudiante", estudiadnte);

        let formData = new FormData();
     
        formData.append("identificacion", file);
        
        const headers1 = EstudiantesApi.requestHeaders("multipart/form-data");
        const headers = {
            "apikey": headers1.apikey,
        //     "Accept": "application/json",
        //     "Content-Type": "multipart/form-data",
        };
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiadnte._id+"/identificacion", {
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

    static async getIdentificacionEstudiante(estudiadnte)
    {
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiadnte._id+"/identificacion", {
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

    static async updateEstudiante(estudiadnte)
    {
        console.log("EstudiantesApi.updateEstudiante", estudiadnte);
        
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+estudiadnte._id, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(estudiadnte)
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

    static async deleteEstudiante(Estudiante)
    {
        console.log(Estudiante);
        
        const headers = EstudiantesApi.requestHeaders();
        const request = new Request(EstudiantesApi.API_BASE_URL + "/estudiantes/"+Estudiante._id, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(Estudiante)
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