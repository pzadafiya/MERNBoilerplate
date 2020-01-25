# MERN boilerplate

This project was bootstrapped with Create React App.

## Set up and execution of the project

**To download the boilerplate and link it with your GitHub project**

(replace `<my-react-app>` and `<https://github.com/user/my-react-app.git>` by what you want, without `<` and `>` ).

``` sh
# Clone the project with only the last commit and save it in the folder <my-react-app>
$ git clone --depth=1 https://github.com/pzadafiya/MERNBoilerplate.git <my-react-app>

$ cd <my-react-app>

# Set your GitHub repository as the "origin" remote repository
$ git remote add origin <https://github.com/user/my-react-app.git>
```

### Files to add

You should have a `server/.env` file, with for example the following values:

``` 

# .env
NODE_SERVER = http://localhost
NODE_SERVER_PORT=3002
MONGO_DB_URL = mongodb://127.0.0.1:27017/MERNBoilerplate

# set you nodemailer email and password here
EMAIL_ADDRESS = anyValue
EMAIL_PASSWORD = anyValue

```

**To install all the packages**

``` sh
# Install server and client packages + build the React applicatin
$ npm install

# OR you can install manually the server and client packages
$ (cd server && npm install)
$ (cd client && npm install)
```

**To run the server and the client**

``` sh
# Open a first terminal
$ cd server && run command nodemon server
# after run above command, app listening on port:3002 message display in terminal
# Run the server on http://localhost:3002/

# Open a second terminal
$ cd client && run command npm start
# You can now view mern-boilerplate in the browser. http://localhost:3000/
```

So now you can go to 

* http://localhost:3002/api/: A simple API call
* http://localhost:3002/: The website based on build (that you can update with `$ (npm run build)` )
* http://localhost:3000/: The last version of your React application that is calling your API with the base url "http://localhost:3002/api/"

## Global information

### Directory structure

``` 
client/
    build/
    public/
    src/
        assets/
        components/
        helpers/
        pages/
        services/
        store/
        App.js
        App.scss
        index.js
        routes.js
    package.json
server/
    data/
    models/
    routes/
    services/
    utilities/
    package.json
.gitignore
package.json
README.md
```

## How to implement a Full Stack feature?

1. Implement it in the sever by creating a route and some models if necessary
2. Test it with Postman with many different cases
3. Create a new API method in `client/src/services/{exampleService}.js` 
4. Consume the API method in your client :)

## Example in the code

### `server/routes/index.js` 

* `router.get('/login', authenticationService.login)` : Route to send the user login details
* `router.post('/register',authenticationService.register)` : Route to create a new user
* `router.post('/forgotpassword',authenticationService.forgotpassword)` : Route to send the user details for forgot password via email
* `router.put('/resetpassword',authenticationService.resetpassword)` : Route to reset password


## Guideline to create clean code

### Send the right status code

Your backend API sends some status code at every request. By default, it will send `200` , which means `OK` , everything went fine.

If something bad happened, you should a send a different status code:

### Successful

* ** `200` OK**: The 200 status code is by far the most common returned. It means, simply, that the request was received and understood and is being processed.

### Redirection 

* ** `300` Multiple Choice**: The 300 status code indicates that a resource has moved. The response will also include a list of locations from which the user agent can select the most appropriate

### Client Error

* ** `400` Bad Request**: Something is missing in wrong in the request (eg: missing data).
* ** `401` Unauthorized**: For missing or bad authentication.
* ** `403` Forbidden**: A 403 status code indicates that the client cannot access the requested resource. That might mean that the wrong username and password were sent in the  request.
* ** `404` Not Found**: The resources/route doesn't exist.
* ** `409` Conflict**: The request couldn't be completed because of a conflict (eg for signup: username already taken).

### Server Error

* ** `500` Internal Server Error**: The server encountered an unexpected condition which prevented it from fulfilling the request.

By sending the right status code, you will catch more easily your error on the client side.

**Example on the server side**

``` js
// If the user provide wrong username or password then  we can write like this
res.status(409).json({
    message: "Incorrect password"
})
```

**Example on the client side**

``` js
// Call to login 
//   here, we can use axios, Promise based HTTP client for the browser and node.js
//   In case of success, store details in storage and return user object
//   In case of error, display message to user

return axios({
    method: 'get',
    url: baseUrl + 'auth/login',
    params: {
        email: email,
        password: password
    }
}).then((user) => {
    // store user details in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user.data));
    return user.data;
}).catch((error) => {
    handleError(error.response)
});
}
```

