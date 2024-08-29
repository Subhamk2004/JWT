import express from 'express';
import Posts from './utils/constants.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT,() =>{
    console.log('Server is running on port '+PORT);
})


app.get('/posts', authenticateToken, (req, res) => {
    res.send(Posts.filter(post => post.username === req.user.name)).status(200)
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

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET); // this has no expiration date
    res.json({accessToken: accessToken})
})

function authenticateToken(req, res, next) {
    console.log(req.headers);
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    // we need to send Authorisation bearer token while making request to the server
}