
var baseUrl = "";
if (process.env.NODE_ENV === 'development')
    baseUrl = "http://localhost:3002/api/";
else
    baseUrl = "http://52.8.76.51:82/api/";

var imgUrl = "";
if (process.env.NODE_ENV === 'development')
    imgUrl = "http://localhost:3002/user/images/";
else
    imgUrl = "http://52.8.76.51:82/user/images/";

export const config = {
    baseUrl,
    imgUrl
};



