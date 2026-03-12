import { County } from "../models";
class GetCounties{
     constructor(private countyData: County[], private input?: any) {
        this.countyData = countyData;
        this.input = input;
      }
      call(): any{
        let counties : any = [];
        try {
             if (!this.countyData) {
        throw new Error("Unable to read county data");
      }
      if(!!this.input === false){
        this.countyData.map((county)=>counties.push(county.county_name))
      } 
      
      if(typeof this.input === 'number' && this.input>0 && this.input<48){
        counties = this.countyData[this.input-1];
      }
      if(typeof this.input === 'string'){
        counties=this.countyData.find((county)=>county.county_name.toLowerCase()===this.input.toLowerCase())
      }
      return counties
        } catch (error) {
             console.error("Error executing getCounties. ", error);
      return "Unable to read county data";
        }
      }
}

export default GetCounties;