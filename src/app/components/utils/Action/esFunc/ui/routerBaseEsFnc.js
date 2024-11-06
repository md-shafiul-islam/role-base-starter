import { isEmptyOrNull } from "../gen-es/esCheckFunc";

export const getCurrentActiveRout = (path)=>{
    
    if(!isEmptyOrNull(path)){
        const splitStr = path.split("/");
        if(Array.isArray(splitStr)){
            return splitStr;
        }
    }

    return "";
    
}