import { County } from "../models";

class GetAll {
  constructor(private countyData: County[]) {}

  call(): County[] {
    try {
      if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      return this.countyData;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  }
}

export default GetAll;
