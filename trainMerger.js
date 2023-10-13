module.exports = class TrainAB {

    constructor(dataInput) {
      this.dataInput = dataInput;
      this.station_after_HYB = {
        HYB: 0,
        NGP: 400,
        ITJ: 700,
        BPL: 800,
        AGA: 2500,
        NDL: 2700,
        PTA: 3800,
        NJP: 4200,
        GHY: 4700,
      };
      this.DeptTrain = [];
    }
  
    processInput(input, type) {
      const arrivalLabels = ['ARRIVAL', `TRAIN_${type}`, 'ENGINE'];
      const filteredStations = [];
      const tempBoggie = [];
  
      for (let i = 2; i < input.length; i++) {
        const station = input[i].trim();
        if (this.station_after_HYB.hasOwnProperty(station)) {
          filteredStations.push(station);
          tempBoggie.push({
            name: station,
            id: this.station_after_HYB[station],
          });
        }
      }
  
      const boggieList = arrivalLabels.concat(filteredStations);
      const boggie = boggieList.join(' ');
      console.log(boggie);
      return tempBoggie;
    }
  
    TrainA(input) {
      return this.processInput(input, 'A');
    }
  
    TrainB(input) {
      return this.processInput(input, 'B');
    }
  };