const cheerio = require("cheerio");
const axios= require("axios");


const url="https://www.nivea.de/neu-von-nivea?sort=date";
async function getCardsInfo(){
try{
const response = await axios.get(url);
const $ = cheerio.load(response.data);
const info = $("h1").text();
console.log(info);
}
catch(error){
    console.error(error)
}
}
getCardsInfo();