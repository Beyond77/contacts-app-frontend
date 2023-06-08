import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ContactsProvider } from './context/contactsContext'
import { AppRouter } from './router/AppRouter'

const ContactApp = () => {
  return (
    <ContactsProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ContactsProvider>
  )
}

export default ContactApp
