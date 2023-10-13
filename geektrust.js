const fs = require("fs");
const TrainAB = require('./trainMerger');
const trainAB = new TrainAB();

class Train {
  constructor(DataInput) {
    this.DataInput = DataInput;
    this.station_after_hyd = {
      "HYB": 0,
      "NGP": 400,
      "ITJ": 700,
      "BPL": 800,
      "AGL": 2500,
      "NDL": 2700,
      "PTA": 3800,
      "NJP": 4200,
      "GHY": 4700
    };
  }
  main(dataInput) {
    const input = dataInput.toString().split("\n");
    const inputLine = input.filter(s => s.replace(/\s+/g, '').length !== 0);
    var deptTrainA = [];
    var deptTrainB = [];
    for (let i = 0; i < inputLine.length; i++) {
        if (inputLine){
            let train_name = inputLine[i].split(' ');
            if (train_name[0] == 'TRAIN_A'){
                deptTrainA = trainAB.TrainA(train_name);
            }
            else {
                deptTrainB = trainAB.TrainB(train_name);
            }
        }
    }

    const startBoggie = ['DEPARTURE', 'TRAIN_AB', 'ENGINE', 'ENGINE'];
    const departAB = deptTrainA.concat(deptTrainB);
    departAB.sort((a, b) => b.id - a.id);
    const boggiesToArray = departAB.filter(boggie => boggie.id !== 0).map(boggie => boggie.name);

    const newBoggie = startBoggie.concat(boggiesToArray);
    const boggie = newBoggie.join(' ').replace('HYB', '').replace(/,/g, ' ');
    console.log(boggie.trim());
  }
}

const filename = process.argv[2];
const data = fs.readFileSync(filename).toString();
const train1 = new Train();
train1.main(data);
