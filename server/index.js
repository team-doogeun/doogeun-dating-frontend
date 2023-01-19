const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { SignIn, accessToken, refreshToken, SignInSuccess, SignOut } = require('./controller');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

// client에서 server로 요청가능해짐
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.post('/signin', SignIn);
app.get('/accesstoken', accessToken);
app.get('/refreshtoken', refreshToken);
app.get('/SignIn/success', SignInSuccess);
app.post('/SignOut', SignOut);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
