const express = require("express");
const port = 3000;

const app = express();

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is up and running at localhost:${port}!`);
});
