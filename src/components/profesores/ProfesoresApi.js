export default class ProfesoresApi
{
    static API_BASE_URL = "/api/v1";

    static requestHeaders()
    {
        return {'Content-Type': 'application/json'};
    }

    /*
    static getAllProfesores()
    {
        const headers = ProfesoresApi.requestHeaders();
        const request = new Request(ProfesoresApi.API_BASE_URL + "/profesores", {
            method: "GET",
            headers: headers
        });

        return fetch(request).then(response => {
            return response.json();
        });
    }
    */

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
            throw Error("Response not valid "+response.status);
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
            throw Error("Response not valid "+response.status);
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
            throw Error("Response not valid "+response.status);
        }   

        return response;
    }

    /*
    prueba(profesor)
    {
        

        var profesor2 = {
            identificacion: "123456789",
            nombre: "Juan",
            password: "123456789",
            editable: true
        };

        
        const response = ProfesoresApi.postData(ProfesoresApi.API_BASE_URL + "/profesores", profesor)
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
        });
        
    }
    */

    // Example POST method implementation:
    static async postData(url = '', data = {}) 
    {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
}