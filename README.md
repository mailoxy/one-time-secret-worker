One-Time-Secret service (based on CloudFlare Worker/KV/Pages)

Simple Cloudflare Worker API for a One-Time-Secret service. This service allows to generate a secret, retrieve it once and then it gets deleted from the server. It receives an encrypted secret from the client, stores it in the Cloudflare KV, and responds with a unique key for retrieving the secret. Retrieving the secret can be done only once. On second attempt, the secret would have been deleted.
  
See also https://github.com/mailoxy/one-time-secret-web
  
## Initialize KV store
```
wrangler kv:namespace create SECRET_STORE
wrangler kv:namespace create SECRET_STORE --preview
```
  
## Local development
```
wrangler dev --local
```
  
## Publish
```
wrangler publish
```

## Demo

https://api.one-time-secret.com