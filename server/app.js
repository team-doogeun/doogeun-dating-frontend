const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");

app.use(cors());
// 웹에서 body에 데이터를 담아서 보내는데
// 이를 사용하기 위해선 parsing해야됨
// 다음 두 줄이 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// multer 설정
const upload = multer({ dest: "uploads/" });

// 업로드된 파일 처리하는 라우트 핸들러
app.post("/users/signup", upload.single("basicFilePath"), (req, res) => {
  const file = req.file; // 업로드된 파일

  // 파일 처리 로직
  console.log(file);

  // 다른 데이터 처리 로직
  const { user } = req.body;
  console.log(user);

  res.send("File uploaded successfully");
});
