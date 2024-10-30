const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/';

const RESET_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset'; // POST

const get = async (url) => {
    const response = await fetch(BASE_URL + url);
    return response.json();
};

const post = async (url, data) => {
    const response = await fetch(BASE_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const put = async (url, data) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const remove = async (url) => {
    const response = await fetch(url, {
        method: 'DELETE'
    });
    return response.json();
}

const reset = async () => {
    const response = await fetch(RESET_URL, {
        method: 'POST'
    });
    return response.json();
}

export {get, post, put, remove, reset};