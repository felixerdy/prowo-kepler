export class DataService {
    async fetchData(boxId){
      const boxRequest = await fetch(
        `https://api.opensensemap.org/boxes/${boxId}?format=json`
      );
      const data = await boxRequest.json();

      return data;
    }
    async getData(boxId){
      const data = await this.fetchData(boxId);

      return data;
    }
    async listAllSensors(boxId){
      const boxData = await this.fetchData(boxId);

      const boxSensors = boxData.sensors[0]._id;
      return boxSensors;
    }

}
