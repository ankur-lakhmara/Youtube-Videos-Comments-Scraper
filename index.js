const ytcm = require("@freetube/yt-comment-scraper");
const express = require("express");
const bodyparser = require("body-parser");
const getvideoid = require("get-video-id");

const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { comments: "" });
});

app.post("/getcomments", (req, res) => {
  let url = req.body.url;
  let { id } = getvideoid(url);
  const payload = {
    videoId: id,
    sortByNewest: false,
    continuation: true,
    mustSetCookie: false,
    httpsAgent: true,
  };

  ytcm
    .getComments(payload)
    .then((data) => {
      console.log(data.comments);
      res.render("index", { comments: data.comments });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(8000, () => {
  console.log("app is listening on port 8000 !");
});
