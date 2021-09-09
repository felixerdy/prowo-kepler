export class DataService {
  async fetchData(boxId) {
    const boxRequest = await fetch(
      `https://api.opensensemap.org/boxes/${boxId}?format=json`
    );
    const data = await boxRequest.json();

    return data;
  }
  async getData(boxId) {
    const data = await this.fetchData(boxId);

    return data;
  }

  async getName(boxId) {
    const data = await this.fetchData(boxId);
    const name = data.name;
    
    return name;
  }


  async listAllSensors(boxId) {
    const boxData = await this.fetchData(boxId);
    let boxSensors = [];
    for (let i = 0; i < boxData.sensors.length; i++) {
      boxSensors[i] = boxData.sensors[i]._id;
    }
    return boxSensors;
  }
  async listAllSensorNames(boxId) {
    const boxData = await this.fetchData(boxId);
    let names = [];
    for (let i = 0; i < boxData.sensors.length; i++){
      names.push(boxData.sensors[i].title);
    }
    return names;
  }
  async sortByKeyword(names,keyword){
    let indexFound = 0;
    indexFound = names.indexOf(keyword);
    console.log(indexFound);
    return indexFound;
  }
  async getHistory(boxId, sensorId) {
    const historyReq = await fetch(
      `https://api.opensensemap.org/boxes/${boxId}/data/${sensorId}?from-date=2021-09-09T00:00:00.00Z`
    );

    const history = await historyReq.json();

    return history;
  }
  async formatDataForKepler(dataIn, boxName) {
    // console.log(dataIn);
    let dataOut = [];
    for (let i = 0; i < dataIn.length; i++) {
      dataOut.push({
        name: boxName,
        timestamp: dataIn[i].createdAt,
        lat: dataIn[i].location[1],
        lng: dataIn[i].location[0],
        value: Number(dataIn[i].value),
      });
      // console.log(dataOut);
    }
    return dataOut;
  }
  async dataService(boxIds = [],keyword){
    let data = [];
    for(let i = 0; i < boxIds.length;i++){

    const sensors = await this.listAllSensors(
      boxIds[i]
    );
    const boxName = await this.getName(boxIds[i]);
    const names = await this.listAllSensorNames(boxIds[i]);
    const index = await this.sortByKeyword(names,keyword);
    const tempData = await this.getHistory(
      boxIds[i],
      sensors[index]
    );
    data = [...data, ...await this.formatDataForKepler(tempData,boxName)];
//    console.log("data to Kepler",data);
    
  }
    return data;
  }
}

