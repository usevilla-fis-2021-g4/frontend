export default class MateriasApi
{   
    
    static API_BASE_URL = "/apimaterias/v1";
    
    static requestHeaders()
    {
        return {
            'Content-Type': 'application/json',
            "apikey": "c36488ba-a1e9-4462-a68b-b25e2f6cd6ad"
        };
    }

    static async getAllMaterias()
    {
        const headers = MateriasApi.requestHeaders();
        const request = new Request(MateriasApi.API_BASE_URL + "/materias", {
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


    static async addMateria(materia)
    {
        console.log("MateriasApi.addMateria", materia);
        
        const headers = MateriasApi.requestHeaders();
        const request = new Request(MateriasApi.API_BASE_URL + "/materias", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(materia)
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

    static async updateMateria(materia)
    {
        console.log("MateriasApi.updateMateria", materia);
        
        const headers = MateriasApi.requestHeaders();
        const request = new Request(MateriasApi.API_BASE_URL + "/materias/"+materia._id, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(materia)
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

    static async deleteMateria(materia)
    {
        console.log(materia);
        
        const headers = MateriasApi.requestHeaders();
        const request = new Request(MateriasApi.API_BASE_URL + "/materias/"+materia._id, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(materia)
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