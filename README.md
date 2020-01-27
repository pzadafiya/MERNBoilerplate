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

**Example on the server side**

### `server/routes/index.js` 

* `router.get('/login', authenticationService.login)` : Route to send the user login details

### `server/service/authentication.js` 

``` js
let login = async (req, res) => {
    // validate req parameter and check in db if credential valid then return response like below.
    // fetch user data and set to data
    if (isValid && data.length == 1)
        return res.status(200).json({
            message: 'Logged in successfully!',data:data
        });
    else
        return res.status(403).json({
            message: 'Incorrect password'
        });
};
```

### Send the status code

Your backend API sends some status code at every request. By default, it will send `200` , which means `OK` , everything went fine.
If something bad happened, you should a send a different status code: like `400` Bad Request, `404` Not Found, `500` Internal Server Error
By sending the right status code, you will catch more easily your error on the client side.

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
    sessionStorage.setItem('user', JSON.stringify(user.data));
    return user.data;
}).catch((error) => {
    handleError(error.response)
});
}
```

