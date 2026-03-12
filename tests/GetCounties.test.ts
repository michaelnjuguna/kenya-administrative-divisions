import { KenyaAdministrativeDivisions as kad } from "../src/main";
import { County } from "../src/models";

describe('KenyaAdministrativeDivisions - getCounties',()=>{
    test('No parameter passed',()=>{
        const result = kad.getCounties();
       
    expect(Array.isArray(result)).toBe(true);
  
    expect(result.length).toBe(47);
    });
    test('Valid number passed as parameter',()=>{
        const result = kad.getCounties(1);
        expect(result.county_code).toBe(1);
        if(!!result){
            expect(result).toHaveProperty('county_code');
             expect(result).toHaveProperty('county_name');
              expect(result).toHaveProperty('constituencies');
              expect(Array.isArray(result.constituencies)).toBe(true);

        }
    });
    test('Invalid number is passed as param',()=>{
        const result = kad.getCounties(90);
        expect(typeof result === 'string');
    });
    test('Valid string passed as param',()=>{
             const result = kad.getCounties('Mombasa');
             
              expect(result.county_code).toBe(1);
                 if(!!result){
            expect(result).toHaveProperty('county_code');
             expect(result).toHaveProperty('county_name');
              expect(result).toHaveProperty('constituencies');
              expect(Array.isArray(result.constituencies)).toBe(true);

        }
    });
      test('Invalid string is passed as param',()=>{
        const result = kad.getCounties('Mom');
        console.log(result);
        expect(typeof result === 'string');
    });

})