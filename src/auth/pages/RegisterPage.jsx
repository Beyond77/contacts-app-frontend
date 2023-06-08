import React, { useContext } from 'react'
import contactsApi from '../../api/ContactsApi';
import { ContactsContext } from '../../context/contactsContext';
import { useForm } from '../../hooks/useForm';

const registerFormFields = {
  email: "",
  password: ""
}

export const RegisterPage = () => {

 const [ { name, email, password } , handleInputChange ] = useForm(registerFormFields);
 const { setToken, setUid } = useContext(ContactsContext)

  const handleSubmit = async ( event ) => {
    event.preventDefault();
    try {
      const { data } = await contactsApi.post("/auth/new", { name, email, password});
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUid(data.uid);
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div className="h-screen flex items-center justify-center bg-blue-200">
      <div className="bg-white drop-shadow-md rounded-sm shadow-lg w-3/4 md:w-2/6 flex flex-col items-center p-8" >
        <h3 className="text-3xl font-bold mt-5 ">Crear Cuenta</h3>
        <form className="w-2/4" onSubmit={handleSubmit} >
        <div className="my-10">
            <input 
              name="name"
              type="text" 
              className="w-full h-10 p-2 border" 
              placeholder="Nombre completo" 
              onChange={handleInputChange}
            />
          </div>
          <div className="my-10">
            <input 
              name="email"
              type="text" 
              className="w-full h-10 p-2 border" 
              placeholder="Correo" 
              onChange={handleInputChange}
            />
          </div>
          <div className="my-10 w-full">
            <input
              name="password"
              type="password"
              className="w-full h-10 p-2 border"
              placeholder="Contraseña"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-8 mb-5 flex justify-center">
            <button type="submit" className="btnSubmit bg-blue-500 px-5 py-3 rounded-md text-white" >
                Registrate
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}
