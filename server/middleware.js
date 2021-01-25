const fs = require('fs');

module.exports = {
  initGame: function() {
    const plotDataCode = "NAHMORY";
    var plotDataPath = "./plot_data/" + plotDataCode + ".json";

    const data = JSON.parse(fs.readFileSync(plotDataPath, 'utf8'));
    console.log(data);
    return data;
  }
}