import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const ContentContainer = styled.div`
  text-align: left;
  padding: 20px;
  border: 2px solid #ccc;
  transform: scale(2);
`;

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }



  addContact = (name, number) => {
    const { contacts } = this.state;
    const newContact = { id: Date.now().toString(), name, number };
    if (contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`Contact "${name}" is already in contacts.`);
      return;
    }
    this.setState({ contacts: [...contacts, newContact] });
  };

  deleteContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    this.setState({ contacts: updatedContacts });
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <AppContainer>
        <ContentContainer>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
          <Filter filter={filter} onChange={this.handleFilterChange} />
        </ContentContainer>
      </AppContainer>
    );
  }
}

export default App;
