import axios from 'axios';

export default class CommonHttp {
    constructor() {
        this.header = { 'Authorization': 'Bearer ', 'Content-Type': 'application/json; charset=utf-8' }
    }
    async load(option, url, postData) {
        try {
            const response = await axios({
                headers: this.header,
                method: option,
                url: url,
                data: postData ? postData : '',
            });
            return response;
        }
        catch (error) {
            console.log(error);
        }
    }
}