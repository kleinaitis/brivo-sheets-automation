require('dotenv').config();

async function getBrivoAccessToken() {
    const credentials = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
    const url = 'https://auth.brivo.com/oauth/token'

    const body = new URLSearchParams({
        grant_type: 'password',
        username: `${process.env.ADMIN_USERNAME}`,
        password: `${process.env.ADMIN_PASSWORD}`
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': `Basic ${credentials}`,
                'api-key': `${process.env.API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        });

        const data = await response.json();
        return data["access_token"]

    } catch (error) {
        console.error(error.message)
    }
}

async function getBrivoUsers() {

    const accessToken = await getBrivoAccessToken()
    const url = 'https://api.brivo.com/v1/api/users'

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${accessToken}`,
                'api-key': `${process.env.API_KEY}`
            },
        });

        const data = await response.json();
        console.log(data.data[0])

    } catch (error) {
        console.error(error.message)
    }
}

getBrivoUsers()
