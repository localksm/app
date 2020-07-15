export const splitAmount = ( value) => {
    try {        
        const valor = Number(value).toString();
        let splitString  = valor.split(".");
        return splitString.length > 1 ? `${splitString[0]}.${splitString[1].substring(0,4)}` : valor ;
    } catch (error) {
     throw new Error(error);   
    }
};