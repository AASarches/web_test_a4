const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];


function initialize() {
    return new Promise((resolve) => {
      sets = setData.map((set) => {
        const theme_id = set.theme_id;
        const foundTheme = themeData.find((theme) => theme.id === theme_id);
        
        let theme = "temp";
        if (foundTheme) {
          theme = foundTheme.name;
        }
        
        return { ...set, theme };
      });
      resolve(); 
    });
  }

function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets);
        } 
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const foundSet = sets.find(set => set.set_num === setNum);
        if (foundSet) {
            resolve(foundSet);
        } else {
            reject("Unable to find requested set.");
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        let themeUpperCase = theme.toUpperCase();
        const foundSets = sets.filter(set => set.theme.toUpperCase().includes(themeUpperCase));
        if (foundSets.length > 0) {
            resolve(foundSets);
        } else {
            reject("Unable to find requested sets.");
        }
    });
}

module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
};

