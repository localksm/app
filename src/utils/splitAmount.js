export const splitAmount = (value, substring=4) => {
    try {        
        const stringvalue = Number(value).toString();
        let splitString  = stringvalue.split(".");
        return splitString.length > 1 ? `${splitString[0]}.${splitString[1].substring(0,substring)}` : stringvalue ;
    } catch (error) {
     throw new Error(error);   
    }
};