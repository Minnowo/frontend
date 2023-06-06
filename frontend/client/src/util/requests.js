import findCookie from "./findCookie";
import ENDPOINT from "./API";

export async function tryExecutiveAuth () {
    
        //Grab the Cookie:
        const token = findCookie('access_token', document.cookie);  
    
        //Make The Request:
        const RESPONSE = await fetch(ENDPOINT + 'user/check_exec_auth', {
            method: 'GET' , 
            headers: {'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token }
            }
        );

        return RESPONSE.status;
    
}

export async function InitRequest() {

    const token = findCookie('access_token', document.cookie);

    const response = await fetch(
      /*Endpoint URL */ ENDPOINT, 
      /*Req Params */{method: 'GET', headers: {'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+token } } 
    )

    console.log(response)
    if(response.status === 200){
      return 1;
    }

    if(response.status === 401){
      return 0;
    }


}

const SEARCH_ENDPOINT = `http://localhost:8080/searchIndex-1.0-SNAPSHOT/`;

export async function SchoolTermRequest(redux_identifier, body, callback) {

//export async function SchoolTermRequest() {
    const RESPONSE = await fetch(SEARCH_ENDPOINT + 'school/term', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
      const ResponseJSON = await RESPONSE.json();
      callback(redux_identifier, ResponseJSON); // Redux Callback
      return;
}