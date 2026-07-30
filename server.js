// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/verify", async (req, res) => {
  const token = req.body["h-captcha-response"];
  const secret = process.env.ES_1ad8c3b9538d4630bc0fbc3659126eb3; // store in environment variable

  const verifyURL = "https://hcaptcha.com/siteverify";
  const response = await fetch(verifyURL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `response=${token}&secret=${secret}`
  });

  const data = await response.json();
  if (data.success) {
    res.send("hCaptcha passed!");
  } else {
    res.send("hCaptcha failed.");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
