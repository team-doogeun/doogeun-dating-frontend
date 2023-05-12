const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");

// body-parser 미들웨어 등록
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// 웹에서 body에 데이터를 담아서 보내는데
// 이를 사용하기 위해선 parsing해야됨
// 다음 두 줄이 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//bodyParser.json([options]);

let id = 2;

const user = [
  {
    id: 1,
    text: "dd",
    done: false,
  },
];

app.get("/api/todo", (req, res) => {
  res.json(user);
});

app.post("/api/todo", (req, res) => {
  const { text, done } = req.body;
  user.push({
    id: id++,
    text,
    done,
  });
  return res.send("success");
});

// 웹과 서버의 포트는 다르게 열어줘야한다
app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});

// app.post("/users/signup", (req, res) => {
//   // 보내는 변수명과 받는 변수명이 똑같아야 인식이 된다!
//   const { user, image } = req.body;

//   console.log(user);
//   return res.send(user);
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(upload.any());

app.post(
  "users/signup",
  upload.fields([
    { name: "user" },
    { name: "basicFilePath" },
    { name: "secondFilePath" },
    { name: "thirdFilePath" },
  ]),
  (req, res) => {
    // 업로드된 파일 및 필드에 대한 처리
    const userField = req.body.user; // 'user' 필드 값
    const firstFilePathField = req.body.firstFilePath; // 'firstFilePath' 필드 값
    const secondFilePathField = req.body.secondFilePath; // 'secondFilePath' 필드 값
    const thirdFilePathField = req.body.thirdFilePath; // 'thirdFilePath' 필드 값

    // 파일 처리 로직
    const firstFile = req.files.firstFilePath[0]; // 'firstFilePath' 필드에 업로드된 파일
    const secondFile = req.files.secondFilePath[0]; // 'secondFilePath' 필드에 업로드된 파일
    const thirdFile = req.files.thirdFilePath[0]; // 'thirdFilePath' 필드에 업로드된 파일

    // 필드 및 파일 처리 결과 반환
    res.send({
      user: userField,
      firstFilePath: firstFilePathField,
      secondFilePath: secondFilePathField,
      thirdFilePath: thirdFilePathField,
      firstFile: firstFile,
      secondFile: secondFile,
      thirdFile: thirdFile,
    });
  }
);
