export function parseJwt (token) {
    let res=null;
    try{
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        res=JSON.parse(jsonPayload);
    }
    catch(e){}
    return res;
};

const _interval=500;//second
export function newaccessToken(){
    //get new access token with refresh token
    //setInterval
}