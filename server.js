const express = require("express");
const sendMail = require("./mail");
const log = console.log;
const app = express();
const path = require("path");

const PORT = 8080;

//Data Parsing
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.post("/email", (req, res) => {
  //Todo
  //send email here
  const { subject, email, text } = req.body;
  log("Data: ", req.body);

  sendMail(email, subject, text, function (err, data) {
    if (err) {
      log("ERROR: ", err);
      return res.status(500).json({ message: err.message || "Internal Error" });
    } else {
      log("Email sent!");
      return res.json({ message: "Email sent!" });
    }
  });
  res.json({ message: "Message recieved!" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => log("Server is starting on PORT, ", 8080));
