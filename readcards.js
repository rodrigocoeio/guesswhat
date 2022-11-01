const path = require("path");
const fs = require("fs");
const silenceMode = true;

const readFolder = async function (folder, categoryName) {
  const directoryPath = path.join(__dirname, folder);
  const categories = {};
  const cards = [];

  const files = fs.readdirSync(directoryPath);

  files.forEach(async function (fileName) {
    const fullFilePath = folder + "/" + fileName;

    if (fs.lstatSync(fullFilePath).isDirectory()) {
      if (!silenceMode) console.log("reading category: " + fileName);

      const categoryRead = await readFolder(fullFilePath, fileName);
      const category = {
        name: capitalizeFirstLetter(fileName),
        cards: categoryRead.cards,
      };

      categories[fileName] = category;
    } else {
      if (!silenceMode) console.log("reading card: " + fileName);

      const fileExtension = getExtensionFromFileName(fileName);

      if (fileExtension === "jpg" || fileExtension === "jpge") {
        const cardName = removeExtensionFromFileName(fileName);
        const cardAudio = cardName + ".mp3";

        cards.push({
          name: capitalizeFirstLetter(cardName),
          category: categoryName,
          image: fileName,
          audio: fs.existsSync(folder + "/" + cardAudio) ? cardAudio : false,
        });
      }
    }
  });

  return {
    categories,
    cards,
  };
};

const getExtensionFromFileName = function (fileName) {
  const fileNameSplited = fileName.split(".");

  return fileNameSplited[1] ? fileNameSplited[1].toLowerCase() : "";
};

const removeExtensionFromFileName = function (fileName) {
  return fileName.split(".").slice(0, -1).join(".");
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const readCategories = async function (folder, callback) {
  const categories = await readFolder(folder);
  callback(categories);
};

const folder = "./public/cards";
const categoriesJsonPath = "./src/stores/categories.json";

if (!silenceMode) console.log("reading cards...");

readCategories(folder, function (categories) {
  fs.writeFileSync(categoriesJsonPath, JSON.stringify(categories));
});
