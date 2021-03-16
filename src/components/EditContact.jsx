import React from 'react';
import ContactListService from '../services/service';
import Debug from '../Debug';
import { Toast } from 'primereact/toast';

export default class EditContact extends React.Component {
    constructor(props) {
        super(props)
        this.contactService = new ContactListService();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: 0,
            flag: false,
            loader: true
        }
        this.updateContactInfo = this.updateContactInfo.bind(this);
        this.data = '';
    }
    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.getSelectedContactInfo(this.props.location.state.id);
        }
        else {
            this.toast.show({ severity: 'error', summary: 'Failed', detail: 'Something went wrong please try later!!', life: 3000 });
            this.props.history.push('/')
        }
    }
    getSelectedContactInfo(id) {
        this.contactService.getSelectedContact(id).then((response) => {
            this.data = response.data;
            try {
                if (response.data) {
                    this.setState({
                        firstname: response.data.firstname,
                        lastname: response.data.lastname,
                        email: response.data.email,
                        phoneNumber: response.data.phoneNumber,
                        flag: true,
                        loader: false
                    })
                }
            } catch (e) {
                Debug.log('getSelectedContactInfo.get - Error: ' + e.message)
            }
        })
    }
    updateContactInfo(event) {
        let updateFlag = false;
        event.preventDefault();
        for (var item in this.state) {
            if (this.state.hasOwnProperty(item) && item !== 'flag' && item !== 'loader') {
                if (this.state[item] !== this.data[item]) {
                    updateFlag = true;
                }
            }
        }
        updateFlag ? this.contactService.editContact(this.props.location.state.id, this.state).then((response) => {
            try {
                if (response.status === 200) {
                    this.toast.show({ severity: 'success', summary: 'Success', detail: 'Contact updated successfully!!', life: 3000 });
                    setTimeout(() => {
                        this.props.history.push('/');
                    }, 2000)
                }
                else {
                    this.toast.show({ severity: 'error', summary: 'Failed', detail: 'Something went wrong please try later!!', life: 3000 });
                }
            } catch (e) {
                Debug.log('updateContactInfo.put - Error: ' + e.message)
            }
        }) :
            this.toast.show({ severity: 'info', summary: 'Info', detail: 'Please update at least one field!!', life: 3000 });

    }
    render() {
        return (
            this.state.loader ? <div className="spinner-border"></div> : this.state.flag &&
                <div className="updateContact col-md-6">
                    <Toast ref={(el) => this.toast = el} />
                    <form onSubmit={this.updateContactInfo}>
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
                        <div className="form-group" style={{ textAlign: 'center' }}><input type="submit" value="Update"></input></div>
                    </form>
                </div>
        )
    }
}