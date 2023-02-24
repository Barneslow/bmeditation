const fs = require("fs");

const quoteData = "./data/freshquotes.json";

async function updatedNode() {
  const data = fs.readFileSync(quoteData, "utf-8");
  const content = JSON.parse(data);

  const updatedContent = content.map((element, index) => {
    element.liked = false;
    return element;
  });

  // const updatedContent = content.map((quote, i) => {
  //   quote.id = i;
  //   return quote;
  // });

  fs.writeFileSync(quoteData, JSON.stringify(updatedContent));
}

updatedNode();
