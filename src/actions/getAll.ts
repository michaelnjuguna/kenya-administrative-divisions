import { County } from "../interfaces";

class GetAll {
  constructor(private countyData: County[]) {
    this.countyData = countyData;
  }

  execute(): County[] | string {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      return this.countyData;
    } catch (error) {
      console.error("Error executing getAll. ", error);
      return "Unable to read county data";
    }
  }
}

export default GetAll;
