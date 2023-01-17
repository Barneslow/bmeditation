const fs = require("fs");

const quoteData = "./data/testData.json";

async function updatedNode() {
  const data = fs.readFileSync(quoteData, "utf-8");
  const content = JSON.parse(data);

  const updatedContent = content.map((element, index) => {
    element.liked = false;
    return element;
  });

  fs.writeFileSync(quoteData, JSON.stringify(updatedContent));
}

updatedNode();
