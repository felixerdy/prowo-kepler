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
  async getHistory(boxId, sensorId) {
    const historyReq = await fetch(
      `https://api.opensensemap.org/boxes/${boxId}/data/${sensorId}?from-date=2021-08-15T23:50:50.52Z`
    );

    const history = await historyReq.json();

    return history;
  }
  async formatDataForKepler(dataIn) {
    // console.log(dataIn);
    let dataOut = [];
    for (let i = 0; i < dataIn.length; i++) {
      dataOut.push({
        lat: dataIn[i].location[1],
        lng: dataIn[i].location[0],
        value: Number(dataIn[i].value),
      });
      // console.log(dataOut);
    }
    return dataOut;
  }
}
