export async function handlePutRequest(request, cors_headers) {

    let encryptedSecret: string;
    let expiry: number = 2592000000; // Default to 30 days

    try {
        const {encryptedSecret: secret, expiry: exp} = await request.json();
        encryptedSecret = secret;
        if (exp !== undefined) {
            expiry = exp;
        }
    } catch (e) {
        return new Response('{"error" : "Invalid request", "msg" : "Invalid json"}', {status: 400});
    }

    if (encryptedSecret === undefined) {
        return new Response('{"error" : "Invalid request", "msg" : "No encryptedSecret specified"}', {status: 400});
    }

    if (expiry > 2592000000) {
        return new Response('{"error" : "Invalid request", "msg" : "Expiry time is more than 30 days"}', {status: 400});
    }

    const expirationTtl = Math.floor(expiry / 1000); // Convert from milliseconds to seconds

    const secretKey = generateKey();

    await SECRET_STORE.put(secretKey, encryptedSecret, {expirationTtl});

    const expiresAt = new Date();

    expiresAt.setSeconds(expiresAt.getSeconds() + expirationTtl);

    return new Response(JSON.stringify({secretKey, expiresAt: expiresAt.toISOString()}), {
        headers: {
            'Content-Type': 'application/json',
            ... cors_headers
        },
        status: 201
    });
}

function generateKey() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return(s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}
