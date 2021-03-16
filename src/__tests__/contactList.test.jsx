import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
let ContactList = require('../components/ContactList.jsx').default;

describe('Contact list page', function () {
    let component;
    let interval;
    beforeAll(() => {
        return new Promise((resolve) => {
            component = mount(<MemoryRouter><ContactList /></MemoryRouter>);
            interval = setInterval(() => {
                component.update();
                if (component.find('.contact-list').children().length > 1) {
                    clearInterval(interval);
                    resolve();
                }
            }, 500);
        }).then(() => {
            return;
        }).catch((e) => {
            Debug.log('ContactList.beforeAll - Error: ' + e);
        });
    }, 150000);
});