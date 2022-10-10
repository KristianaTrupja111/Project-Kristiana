const cheerio = require("cheerio");
const axios= require("axios");
const j2cp = require("json2csv").Parser;
const fs = require("fs")
const product="https://www.nivea.de/neu-von-nivea?sort=date";
const baseUrl ="https://www.nivea.de/";

const product_data = []
async function getCards(url){
try{
const response = await axios.get(url);
const $ = cheerio.load(response.data);
const cards = $("article");
cards.each(function(){
    title= $(this).find(".nx-content-teaser__headline").text().trim();
    description=$(this).find(".nx-content-teaser__description").text().trim();
   link=$(this).find(".nx-content-teaser__link").text().trim();
    product_data.push({title,description,link})
});

    const parser = new j2cp();
    const csv = parser.parse(product_data);
    fs.writeFileSync("./cards.csv",csv)

console.log(product_data)
}

catch(error){
    console.error(error)
}
}
getCards(product);