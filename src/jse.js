const JSE_BASE_URL = 'http://localhost:8000';

function toJson(response) {
    if (response.ok) {
        return response.json();
    } else {
        return response.json().then(error => {
            return Promise.reject(error);
        })
    }
}

const jse = {
    run(code, context) {
        const payload = {
            code: code,
            context: context,
            language: 'javascript',
            modules: []
        };

        const headers = new Headers({"Content-Type": "application/json"});

        return fetch(`${JSE_BASE_URL}/code`, {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(payload)
        })
        .then(toJson);
    },

    getModules() {
        return fetch(`${JSE_BASE_URL}/modules`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(toJson);
    }
};

export default jse
