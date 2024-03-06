const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get("/slide-index", (req, res) => {
  let slideIndex = 0;

  try {
    slideIndex = parseInt(fs.readFileSync("slide-count.txt", "utf8")) || 0;
  } catch (err) {
    console.error("Error reading slide index:", err);
  }

  res.send(slideIndex.toString());
});

app.post("/update-slide-index", (req, res) => {
  const slideIndex = req.body.slideIndex;

  try {
    fs.writeFileSync("slide-count.txt", slideIndex.toString());
    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating slide index:", err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}!`);
});
