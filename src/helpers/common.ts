import axios from "axios";
export function getCurrentTimestamp() {
    return Date.now();
}

export function apiCall(method: string, url: string, body?: any) {
    return axios({
        method,
        url,
        headers: {
            "Content-Type": "application/json",
        },
        data: body ? JSON.stringify(body) : undefined,
    });
}
