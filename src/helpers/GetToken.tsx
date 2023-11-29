import axios from 'axios'
axios.defaults.withCredentials = true

export async function getToken() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/token`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}