import { authHeader } from '../_helpers';

// const api = "http://127.0.0.1:8000"
const api = "http://3.8.93.243:8000"
// const api = "http://3.8.93.243"

export const userService = {
    login,
    logout,
    register,
    register_child,
    results,
    process_message,
    delete: deleteChild,
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
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
    };
    return fetch(`${api}/users/create/`, requestOptions).then(handleResponse);
}

function register_child(child) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(child)
    };

    return fetch(`${api}/child/`, requestOptions).then(handleResponse);
}

function results(child_data){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${api}/results/?child_id=${child_data.child_id}`, requestOptions).then(handleResponse);
}

function process_message(message_data) {
    console.log('sending request to process next message')
    console.log(JSON.stringify(message_data))
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(message_data)
    }

    return fetch(`${api}/processmessage/`, requestOptions).then(handleResponse);
}

function deleteChild(child_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
  };

    return fetch(`${api}/delete/?child_id=${child_id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //could not resolve 'location', tried instead:
                window.location.reload(true)
                // location.reload(true);
            }
            const error = JSON.stringify(data.message) || response.statusText;
            // const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

