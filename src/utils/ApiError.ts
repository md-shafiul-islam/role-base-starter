
export default class ApiError extends Error {

    static error(message:string, code:string){
        throw Error(`${code} : ${message}`);
    }
}