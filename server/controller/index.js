const userDatabase = require('../Database');
const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

const SignIn = (req, res, next) => {
  const { id, pw } = req.body; // 사용자 정보를 파싱해옴

  // json data의 0번째 data를 가져옴
  // data가 잘 가져와지는지 확인용 찍기
  const userInfo = userDatabase.filter((item) => {
    return item.id === id;
  })[0];

  if (!userInfo) {
    // 유저가 없을경우 403 에러 메시지
    res.status(403).json('Not Authorized');
  } else {
    // 유저가 있을경우 token 발급
    try {
      // access token(user data를 담음) 발급
      // 1. 토근에 담을 정보 2. secret 정보 3. 유효기간
      const accessToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1m',
          issuer: 'Seung',
        }
      );

      // refresh token 발급
      const refreshToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: '24h',
          issuer: 'Seung',
        }
      );

      // token 전송, 쿠키에 담음
      res.cookie('accessToken', accessToken, {
        // https와 http의 차이를 명시
        secure: false,
        // true로 주면 js에서 접근 불가, false는 반대
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
      });

      res.status(200).json('SignIn Success');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // 다음 미들웨어 실행 -> 무슨뜻일까?
  next();
};

const accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter((item) => {
      return item.id === data.id;
    })[0];

    const { password, ...others } = userData;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const refreshToken = (req, res) => {
  // 용도 : access token 갱신
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);

    const userData = userDatabase.filter((item) => {
      return item.id === data.id;
    })[0];

    // access Token 새로 발급
    const accessToken = jwt.sign(
      {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '1m',
        issuer: 'Seung',
      }
    );

    res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json('Access Token Recreated');
  } catch (e) {
    res.status(500).json(error);
  }
};

const SignInSuccess = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter((item) => {
      return item.id === data.id;
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const SignOut = (req, res) => {
  try {
    res.cookie('accessToken', '');
    res.status(200).json('Logout Success');
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  SignIn,
  accessToken,
  refreshToken,
  SignInSuccess,
  SignOut,
};
