import client from "./httpClient"

const login = (data) => {
    return client().post("/login",data)
}

const signup = (data) => {
    return client().post("/signup", data)
}

const logout = () => {
    return client().delete("/logout")
}

const auth = {
    login,
    signup,
    logout
}

export default auth