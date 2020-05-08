
export interface IBaseResponseModel {
    statusCode : number;
    errorCode? : string;
    message? : string;
    data? : JSON
}