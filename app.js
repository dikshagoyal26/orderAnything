const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/", require("./routes/api/user"));

// app.use(require("./utils/tokenmiddleware"));

app.use("/order", require("./routes/api/order"));
app.use("/admin/order", require("./routes/api/order"));
app.use("/admin/user", require("./routes/api/user"));

app.use("/catalogue", require("./routes/api/catalogue"));

app.use((req, res) => {
  res.send("OOPs!!! you have typed something wrong");
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server start at ${PORT}`);
  }
});
