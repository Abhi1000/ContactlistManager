import React, { useEffect, useState, useRef } from 'react';
import ContactListService from '../services/service';
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';

const ContactList = (props) => {
    const [loader, setLoader] = useState(true);
    const [contactlist, setContatcs] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState(null);
    const toast = useRef(null);
    useEffect(() => {
        getContactList();
    }, []);
    const getContactList = () => {
        const contactService = new ContactListService();
        contactService.getContactList().then(res => {
            setLoader(false);
            setContatcs(res.data.data);
        })
    }
    const columns = [
        { field: 'firstname', header: 'Name' },
        { field: 'lastname', header: 'LastName' },
        { field: 'email', header: 'Email' },
        { field: 'phoneNumber', header: 'Contact' }
    ];
    const dynamicColumns = columns.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} sortable filter />;
    });
    const deleteContact = () => {
        const contactService = new ContactListService();
        contactService.deleteContact(selectedContacts[0].id).then(res => {
            if (res.status === 204) {
                toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Selected contact deleted!!', life: 3000 });
                selectedContacts.splice(0, 1);
                renderHeader();
                getContactList();
            }
        });
    }
    const rejectDelete = () => {
        toast.current.show({ severity: 'info', summary: 'Canceled', detail: 'You have canceled the deletion', life: 3000 });
    }
    const deleteModel = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteContact(),
            reject: () => rejectDelete()
        });
    }
    const renderHeader = () => {
        return (
            <div className="row">
                <span className='col-md-4 table-header'>List of Contacts</span>
                {contactlist && selectedContacts && contactlist.length > 0 && selectedContacts.length > 0 &&
                    <div className='col-md-2'><Button label="Delete" className="p-button-danger" icon="pi pi-trash" iconPos="right" onClick={deleteModel} />
                    </div>
                }
                {selectedContacts && contactlist && contactlist.length > 0 && selectedContacts.length === 1 &&
                    <div className='col-md-2'><Button label="Edit" icon="pi pi-user-edit" iconPos="right" onClick={editContact} />
                    </div>
                }
                <div className="global-search p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                </div>
            </div>
        );
    }
    const editContact = () => {
        props.history.push('/editcontact', { id: selectedContacts[0].id });
    }
    const addContact = () => {
        props.history.push('/addcontact');
    }
    const header = renderHeader();
    return (
        loader ? <div className="spinner-border"></div> :
            <div>
                <div className='row'>
                    <Button label="Add New Contact" className="p-button-secondary" icon="pi pi-id-card" iconPos="right" style={{ width: '15%', marginLeft: 45, marginTop: '30px' }} onClick={addContact} />
                </div>
                <div className='row contact-list'>
                    <Toast ref={toast} />
                    <DataTable value={contactlist} scrollable scrollHeight="230px"
                        header={header} className="p-datatable-contacts" dataKey="id" globalFilter={globalFilter}
                        selection={selectedContacts} onSelectionChange={e => { setSelectedContacts(e.value); }}
                        paginator rows={10} emptyMessage="No Contacts found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10, 25, 50]}>
                        <Column selectionMode="multiple" style={{ width: '3em' }} />
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
    )
};

export default ContactList;