const express = require("express");
const parser = require("./parser");
const urlParser = require("./urlParser");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "https://develop--student-gsu-clone.netlify.app",
  })
);

app.listen(PORT, () => {
  console.log(`SERVER IS STARTING on PORT ${PORT}`);
});

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

const searchPerson = (obj, searchStr) => {
  const searchArr = searchStr
    .replace(/^ +| +$|( ) +/g, "$1")
    .split(" ")
    .map((str) => capitalizeFirstLetter(str));

  const searchRes = new Array();
  let index = 1;
  searchStr = searchStr.charAt(0).toUpperCase() + searchStr.slice(1);
  obj.forEach((person) => {
    if (searchArr.length === 2) {
      if (
        searchArr.includes(person.personalData.surname) &&
        searchArr.includes(person.personalData.name)
      ) {
        searchRes.push(person);
        searchRes[index - 1].id = index++;
      }
    } else {
      if (searchArr.includes(person.personalData.surname)) {
        searchRes.push(person);
        searchRes[index - 1].id = index++;
      }
    }
  });

  return searchRes.length === 0 ? false : searchRes;
};

//const dataObj = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const axios = require("axios");

const fetching = async (url) => {
  const { data } = await axios.get(url, {});

  return data;
};


app.get("/api", (req, res) => {
  const surname = urlParser(decodeURI(req.url)).surname;
  card = urlParser(decodeURI(req.url)).card.replace(/\$/g, '%');

  parser(card, surname).then((result) => {
    if (!result) res.status(404);

    res.json({
      message: result,
    });
  });
});
