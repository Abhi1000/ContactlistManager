import CommonHttp from './common-http';

export default class ContactListService {
    constructor() {
        this.commonHttp = new CommonHttp();
        this.baseUrl = 'https://testapi.io/api/abhishek/resource/contactlist';
    }
    getContactList() {
        return this.commonHttp.load('GET', this.baseUrl)
    }
    getSelectedContact(postdata) {
        return this.commonHttp.load('GET', this.baseUrl + '/' + postdata)
    }
    addNewContact(postdata) {
        return this.commonHttp.load('POST', this.baseUrl, postdata)
    }
    editContact(id, postdata) {
        return this.commonHttp.load('PUT', this.baseUrl + '/' + id, postdata)
    }
    deleteContact(postdata) {
        return this.commonHttp.load('DELETE', this.baseUrl + '/' + postdata)
    }
}