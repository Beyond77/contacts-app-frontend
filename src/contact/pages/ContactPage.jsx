import React, { useContext, useEffect, useState } from "react";
import contactsApi from "../../api/ContactsApi";
import { ContactsContext } from "../../context/ContactsContext";
import { useForm } from "../../hooks/useForm";

const createContactForm = {
  name: "",
  number: "",
};

export const ContactPage = () => {
  const { setToken, uid } = useContext(ContactsContext);
  const [ { name, number, id }, handleInputChange, reset, setValues ] = useForm(createContactForm);
  const [ contactos, setContactos ] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const logOut = () => {
    localStorage.setItem("token", "");
    setToken("");
  };

  const handleSubmit = async (event) => {
    if( contactos.find(contact => contact.id === id)){
      event.preventDefault();
      await contactsApi.put(`/contacts/update/${id}`, {
        name,
        number,
      });
    }else {
      event.preventDefault();
      await contactsApi.post("/contacts/create", {
        name,
        number,
      });
    }
    reset();
    getContacts();
  };

  const getContacts = async () => {
    let { data } = await contactsApi.get("/contacts");
    setContactos( data.contactos );
  }

  const deleteContact = async ( id) => {
    setValues({ id })
    if( contactos.find(contact => contact.id === id)){
      await contactsApi.delete(`/contacts/delete/${id}`,);
      setContactos(contactos.filter((contact) => contact.id !== id));
    }
    
  }


  return (
    <div className="p-10">
      <div className="flex justify-end">
        <button onClick={() => logOut()}>Salir</button>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-1/4">
        <h3>Agregar Contacto</h3>
          <div className="my-10">
            <input
              name="name"
              type="text"
              className="w-full h-10 p-2 border"
              placeholder="Nombre"
              onChange={handleInputChange}
              value={name}
            />
          </div>
          <div className="my-10 w-full">
            <input
              name="number"
              type="number"
              className="w-full h-10 p-2 border"
              placeholder="Número de telefono"
              onChange={handleInputChange}
              value={number}
            />
          </div>
          <div className="mt-8 mb-5 flex justify-center">
            <button
              type="submit"
              className="btnSubmit bg-blue-500 px-5 py-3 rounded-md text-white"
            >
              Nuevo Contacto
            </button>
          </div>
        </form>
      </div>
      
      <div className="flex justify-center ">
        <ul className="">
          {contactos.map((contact) => (
            <li key={contact.id} className="grid grid-cols-6 shadow-md p-5 gap-x-5 grid-flow-row-dense">
              <div className="col-span-2">
                <p>Nombre:</p>
                <p> { contact.name } </p>

              </div>
              <div className="col-span-2">
                <p>Numero de telefono</p>
                <p> { contact.number } </p>
              </div>
              <button onClick={ () => setValues({name: contact.name, number: contact.number, id: contact.id}) } >Editar</button>
              <button onClick={ () => deleteContact(contact.id) } >Borrar</button>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
