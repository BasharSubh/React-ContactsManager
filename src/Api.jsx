import axios from "axios"


export async function ApiGetContacts() {


    try {
        const res = await axios.get('/api/contacts', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
        return res
    } catch (error) {
        console.error("Error while fetching contacts:", error);
        throw error;
    }
    
}

export async function ApiRegister(username,email,password) {

    try {
        const res = await axios.post('/api/users/register', { username, email, password })
        return res
    } catch (error) {
        console.error("Error while register", error);
        throw error;
    }
}


export async function ApiLogin(email, password) {
    try {
        const res = await axios.post('/api/users/login', { email, password })
        const data = await res.data
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error("Error while login", error);
        throw error;
    }
}

export async function ApiCreateContact(name, email, phone ) {
    try {
        const res = axios.post('api/contacts', { name, email, phone }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const data = await res.data
        return data
    } catch (error) {
        console.error("Error while create contacts", error);
        throw error;
    }
}

export async function ApiDeleteContact(id) {
    try {
        const res = await axios.delete(`api/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        return res

    } catch (error) {
        console.error("Error while delete contacts", error);
        throw error;
    }
}

export async function ApiUpdateContact(id ,name, email, phone) {
    try {
        const res = await axios.put(`api/contacts/${id}`, { name, email, phone }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return res
    } catch (error) {
        console.error("Error while delete contacts", error);
        throw error;
    }
}

export async function ApiGetContact(id) {
    try {
        const res = await axios.get(`api/contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        return res
    } catch (error) {
        console.error("Error while getting contacts", error);
        throw error
    }
}

export async function ApiUser() {
    try {
        const res = await axios.get('/api/users/current', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return res
    } catch (error) {

        console.error("Error while getting user info", error);
        throw error
    }
}