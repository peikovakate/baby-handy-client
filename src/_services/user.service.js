import { authHeader } from '../_helpers';

const api = "http://127.0.0.1:8000"
// api: 'http://localhost:3000'
// api: '3.8.93.243'

export const userService = {
    login,
    logout,
    register,
    register_child,
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${api}/users/login/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    console.log(user)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    };
    return fetch(`${api}/users/create/`, requestOptions).then(handleResponse);
}

// TODO: add also jwt token
function register_child(child) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(child)
    };

    return fetch(`${api}/child/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('Data');
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //could not resolve 'location', tried instead:
                window.location.reload(true)
                // location.reload(true);
            }
            const error = JSON.stringify(data) || response.statusText;
            // const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}