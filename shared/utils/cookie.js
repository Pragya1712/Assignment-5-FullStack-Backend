const setCookie = (res, name, value) => {
    return res.cookie(name, value, {
        maxAge: process.env.COOKIE_EXPIRY || 3600000,
    })
}

const getCookie = (req, name) => {
    return req.cookies[name]
}

export { setCookie, getCookie }