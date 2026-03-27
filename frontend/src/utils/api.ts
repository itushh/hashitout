const API_URL = 'http://localhost:3001/api';

export const api = {
    async post(path: string, data: any) {
        console.log(`Sending POST to ${API_URL}${path}`, data);
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include', // Important for cookies
        });

        const contentType = response.headers.get('content-type');
        let result;

        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            const text = await response.text();
            console.error('Non-JSON response received:', text);
            throw new Error(`Server returned a non-JSON response (${response.status}). Are you hitting the correct API endpoint?`);
        }

        if (!response.ok) {
            throw new Error(result.message || result.error || 'Something went wrong');
        }

        return result;
    }
};
