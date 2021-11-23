class ResponseError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ResponseError'
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NetworkError'
    }
}


const axios = require('axios');
let baseURL = ''

async function request({ path, method = 'GET', params, data, onUploadProgress }) {
    try {
        let resp = await axios({
            url: path,
            baseURL,
            method,
            params,
            data,
            onUploadProgress
        });

        return resp.data;
    } catch (e) {
        if (e.response) {
            throw new ResponseError(e.response.statusText)
        } else {
            throw new NetworkError("Network error");
        }
    }
}

export default {
    ResponseError,
    NetworkError,
    setBaseUrl(url) {
        baseURL = url
    },
}