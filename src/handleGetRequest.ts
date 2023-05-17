export async function handleGetRequest(url, cors_headers) {

    let secretKey: string |undefined = url.pathname.split('/')[2];

    if (secretKey === undefined) {
        return new Response('{ "error" : "Invalid request", "msg" : "No secretKey provided" }', {status: 400});
    }

    const encryptedSecret: string = await SECRET_STORE.get(secretKey);

    if (encryptedSecret === null) {
        return new Response('{"error":"Not found", "msg":"The secret has already been retrieved or does not exist"}', {
            headers: {
                'Content-Type': 'application/json',
                ... cors_headers
            },    
            status: 404
        });
    }

    await SECRET_STORE.delete(secretKey);

    const encryptedSecretJson: string = JSON.stringify({encryptedSecret});

    return new Response(encryptedSecretJson, {
        headers: {
            'Content-Type': 'application/json',
            ... cors_headers
        }
    });
}
