export default class ProfesoresApi
{
    static API_BASE_URL = "/api/v1";

    static requestHeaders()
    {
        return {};
    }

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
}