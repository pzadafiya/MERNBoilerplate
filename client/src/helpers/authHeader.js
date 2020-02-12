
export function authHeader(isMultipartForm = false) {
    // return authorization header with jwt token
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.token) {
        if (isMultipartForm)
            return {
                'Authorization': 'Bearer ' + user.token,
                'Content-Type': 'multipart/form-data'
            };
        else
            return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}