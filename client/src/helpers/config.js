
var baseUrl = "";
if (process.env.NODE_ENV === 'development')
    baseUrl = "http://localhost:3002/api/";
else
    baseUrl = "http://52.8.76.51:82/api/";

export default baseUrl;