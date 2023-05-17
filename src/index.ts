import {handlePutRequest} from "./handlePutRequest";
import {handleGetRequest} from "./handleGetRequest";
import {handleDeleteRequest} from "./handleDeleteRequest";

addEventListener('fetch', (event : {
    respondWith: (arg0 : Promise < any >) => void;
    request: any;
}) => {
    event.respondWith(handleRequest(event.request))
})

const cors_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}


async function handleRequest(request : {
    method : string;
    url : string;
}) {

    if (request.method === 'OPTIONS') {
        return new Response(null, {headers: cors_headers})
    }

    try {
        const url = new URL(request.url);

        if (request.method === 'PUT' && url.pathname === '/secret') {
            return handlePutRequest(request, cors_headers);
        } else if (request.method === 'GET' && url.pathname.startsWith('/secret')) {
            return handleGetRequest(url, cors_headers);
        } else if (request.method === 'DELETE' && url.pathname.startsWith('/secret')) {
            return handleDeleteRequest(url, cors_headers);
        } else {
            return new Response('Method not allowed', {status: 405});
        }
    } catch (err) {
        return new Response('Invalid URL', {status: 400});
    }
}
