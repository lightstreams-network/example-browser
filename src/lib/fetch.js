import { SERVER_URL } from '../constants';

function getBaseUrl(uri = '') {
    return `${SERVER_URL}${uri}`;
}

function getDefaultGetOptions() {
    return {
        method: 'GET'
    };
}

function getDefaultPostOptions(data) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
}

// Note that the promise won't be rejected in case of HTTP 4xx or 5xx server responses.
// The promise will be resolved just as it would be for HTTP 2xx.
// So we inspect the response.status (response.ok is true for HTTP 2xx) and throw otherwise.
function checkStatus(response) {
    if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    return response;
}

function toJson(response) {
    // yields the result of JSON.parse(response)
    return response.json();
}

export const mapUriToBaseUrl = (uri) => getBaseUrl(uri);

export const fetchAndCheck = (url, options) => fetch(url, options).then(checkStatus);

export const fetchJson = (url, options) => fetchAndCheck(url, options).then(toJson);

export const hGet = (url, options = {}) => (
    fetchJson(mapUriToBaseUrl(url), {
        ...getDefaultGetOptions(),
        ...options
    })
);

export const hPost = (url, body = {}, options = {}) => (
    fetchJson(mapUriToBaseUrl(url), {
        ...getDefaultPostOptions(body),
        ...options
    })
);