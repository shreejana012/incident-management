const signin = async (user) => {
    try {
        let response = await fetch('https://incident-management-gt87.onrender.com/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const signout = async () => {
    try {
        let response = await fetch('/auth/signout/', { method: 'GET' })
        /*
        let response = await fetch('https://incident-management.onrender.com/auth/signout/', { 
            method: 'GET' 
        })
        */
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { signin, signout }

