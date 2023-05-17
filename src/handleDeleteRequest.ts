export async function handleDeleteRequest(url, cors_headers) {

    var secretKey = url.pathname.split('/')[3];

    if (secretKey === undefined) {
        return new Response('{ "error" : "Invalid request", "msg" : "No secretKey provided" }', {status: 400});
    }

    await SECRET_STORE.delete(secretKey);

    return new Response(null, {headers: cors_headers});
}
