export class BaseUtils {

    public static convertToJson(object: any) {
        let jsonStr = JSON.stringify(object);
        return JSON.parse(jsonStr);
    }

    public static currentDateToString(pattern?: string) {
        if (!pattern) {
            pattern = "yyyy-mm-dd h:MM:ss";
        }

        return this.dateAsYYYYMMDDHHMMSS(new Date());
    }

    public static dateAsYYYYMMDDHHMMSS(date: Date): string {
        if(date == null){
            return "";
        }
        return date.getFullYear()
            + '-' + this.leftPad(date.getMonth() + 1, 2)
            + '-' + this.leftPad(date.getDate(), 2)
            + ' ' + this.leftPad(date.getHours(), 2)
            + ':' + this.leftPad(date.getMinutes(), 2)
            + ':' + this.leftPad(date.getSeconds(), 2);
    }

    public static leftPad(val: any, resultLength = 2, leftpadChar = '0'): string {
        return (String(leftpadChar).repeat(resultLength)
            + String(val)).slice(String(val).length);
    }
}