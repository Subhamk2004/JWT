import express from 'express';
import Posts from './utils/constants.mjs';
import jwt from 'jsonwebtoken';
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log('Server is running on port '+PORT);
})


app.get('/posts', (req, res) => {
    res.send(Posts).status(200)
})

app.post('/login', (req, res) => {
    //Authenticate user
    // JWT token is used for authorization and not authentication, it is used to know if the request that a user sending is the same user that authenticated,
    // it is like checking the user in the session if he is logged in our out then make specific requests 
    // check ss1 for classic session, cookie authorization
    // check ss2 for jwt authorization
    // in jwt nothing is stored in the server, as we store session in the server, we don't store jwt in the server
    // check ss3 for how jwt stores data
    // By jwt we are storing user info in client side

    const username = req.body.username || 'Subhamk2004';
    const user = {
        name: username,
    }

    jwt.sign(user)
})