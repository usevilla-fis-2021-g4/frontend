export default class NotasApi{
    static API_BASE_URL = "/apinotas/v1";

    static requestHeaders(){
        return {
            'Content-Type': "application/json",
            'apikey': "0ffe8ae7-50c5-40d8-9e78-ea2ce989c22c"
        };
    } 
    /**Metodo GET **/
    static async getAllNotas()
    {
        let headers = NotasApi.requestHeaders();
        const request = new Request(NotasApi.API_BASE_URL + "/notas", {
            method: "GET",
            headers: headers
        });
        console.log(request.headers)
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

    /*static async getNewPassword()
    {
        const headers = NotasApi.requestHeaders();
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
    }*/

    /**Metodo POST  nota**/
    static async addNota(nota)    {
        console.log("NotasApi.addNota", nota);
        
        const headers = NotasApi.requestHeaders();
        const request = new Request(NotasApi.API_BASE_URL + "/notas", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(nota)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("Exception: ");
            throw Error(response.statusText);
        }        

        return response;
    }

    static async uploadIdentificacionNota(nota, file){
        let formData = new FormData();
     
        formData.append("identificacion", file);
        
        const headers1 = NotasApi.requestHeaders("multipart/form-data");
        const headers = {
            "apikey": headers1.apikey
        };
        const request = new Request(NotasApi.API_BASE_URL + "/notas/"+nota._id+"/identificacion", {
            method: "POST",
            headers: headers,
            body: formData
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("error-excepcion");
            throw Error(response.statusText);
        }        

        return response;
    }
    
    static async getIdentificacionNota(nota){
        const headers = NotasApi.requestHeaders();
        const request = new Request(NotasApi.API_BASE_URL + "/notas/"+nota._id+"/identificacion", {
            method: "GET",
            headers: headers
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true)
        {
            console.log("error-exception");
            throw Error(response.statusText);
        }

        return response.json();
    }

    /**Metodo PATCH nota - modifica */
    static async updateNota(nota){
        console.log("metodo modifica nota");
        
        const headers = NotasApi.requestHeaders();
        const request = new Request(NotasApi.API_BASE_URL + "/notas/"+nota._id, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(nota)
        });

        const response = await fetch(request);

        console.log(response);
        console.log(response.ok);

        if(response.ok !== true){
            console.log("Eror-exception: "+response.statusText);
            throw Error(response.statusText);
        }        

        return response;
    }

    /**Metodo DELETE nota */
    static async deleteNota(nota){
        console.log(nota);
        
        const headers = NotasApi.requestHeaders();
        const request = new Request(NotasApi.API_BASE_URL + "/notas/"+nota._id, {
            method: "DELETE",
            headers: headers,
            body: JSON.stringify(nota)
        });

        const response = await fetch(request);

        console.log(response);

        if(response.ok !== true)
        {
            console.log("Error-exception: "+response.statusText);
            throw Error(response.statusText);
        }   

        return response;
    }

}