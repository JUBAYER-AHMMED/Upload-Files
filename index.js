const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    const dir = `./uploads/${file.fieldname}`;
    fs.mkdirSync(dir, { recursive: true }); // Create the directory if it doesn't exist
    return cb(null, dir); //null = no error: such as user is not logged in etc.
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} - ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  return res.render("home");
});

//for single file upload in a field
// app.post("/upload", upload.single("profileImage"), (req, res) => {
//   // console.log(req.body);
//   console.log(req.file);

//   return res.redirect("/");
// });

//files uploads in multiple fields:
app.post(
  "/upload",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    return res.redirect("/");
  }
);

//array:input multiple photo in same filed together
// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//   // req.files is array of `photos` files
//   // req.body will contain the text fields, if there were any
// })

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
