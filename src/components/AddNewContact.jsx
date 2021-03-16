import React from 'react';
import ContactListService from '../services/service';
import { Toast } from 'primereact/toast';
import Debug from '../Debug';

export default class AddNewContact extends React.Component {
    constructor(props) {
        super(props)
        this.contactService = new ContactListService();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
        }
        this.AddNewUserContact = this.AddNewUserContact.bind(this);
    }
    AddNewUserContact(event) {
        event.preventDefault();
        this.contactService.addNewContact(this.state).then((response) => {
            try {
                if (response.status === 201) {
                    this.toast.show({ severity: 'success', summary: 'Success', detail: 'Contact added Successfully!!', life: 3000 });
                    this.props.history.push('/');
                }
                else {
                    this.toast.show({ severity: 'error', summary: 'Failed', detail: 'Something went wrong please try later!!', life: 3000 });
                }
            } catch (e) {
                Debug.log('AddNewUserContact.post - Error: ' + e.message)
            }
        })
    }
    render() {
        return (
            <div className="newContact col-md-6">
                <Toast ref={(el) => this.toast = el} />
                <form onSubmit={this.AddNewUserContact}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" type="text" value={this.state.firstname} placeholder="Your name..." onChange={event => this.setState({ firstname: event.target.value })} required></input>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" value={this.state.lastname} placeholder="Your last name..." onChange={event => this.setState({ lastname: event.target.value })} required></input>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input className="form-control" type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} placeholder="Your valid email id..." required></input>
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input className="form-control" type="number" value={this.state.phoneNumber} onChange={event => this.setState({ phoneNumber: event.target.value })} placeholder="Your valid 10 digit phone number" required></input>
                    </div>
                    <div className="form-group" style={{ textAlign: 'center' }}><input type="submit" value="Submit"></input></div>
                </form>
            </div>
        )
    }
}