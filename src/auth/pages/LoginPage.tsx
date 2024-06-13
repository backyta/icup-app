// TODO 4 : Desabollar el Login Page y conectarlo con el layout (ver img de referencia en carpeta public)
// NOTE : Mover el schema de validación login-schema al modulo correspondiente (src/auth/validations).
// NOTE : Modificar el formulario Login page según la validación de login-schema
// NOTE : hacer la funcionalidad del OJO, para ver la password y ocultarla, tomar de ejemplo -> (src/app/user/pages/create-user)
// NOTE : Poner placeholders a los inputs
// NOTE : Poner iconos de email y key (password), buscar en librería ReactIcons (ver imagen de referencia en carpeta public)

export const LoginPage = (): JSX.Element => {
  return (

    <>

      <div className="hidden bg-gray h-full sm:block ">
        {/* TODO: Imagen provisional, remplasar con el logo de la iglesia */}
        <img src="https://www.frontendmag.com/wp-content/uploads/2023/01/redux-logo-1-300x286.png" className="inset-0 w-full h-full " alt="imagen del login" />
      </div>

      <div className="bg-vulcan-950 h-full flex justify-center items-center">

      <div className="w-96 h-86 m-2 text-center p-4 text-vulcan-900 bg-vulcan-200 rounded-sm">
          <h1 className="text-2xl font-semibold mb-4">Inicia Secion</h1>

      <form >

      <div className="mb-4 relative">
        <input type="text" name="username" className="w-full p-2 pl-7" placeholder="Name" />
          <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-gray-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000">
              <path d="m16,19v4.3c-1.253.445-2.596.7-4,.7s-2.747-.255-4-.7v-4.3c0-.552.449-1,1-1h6c.551,0,1,.448,1,1Zm-4-11c-1.103,0-2,.897-2,2s.897,2,2,2,2-.897,2-2-.897-2-2-2Zm6,14.376v-3.376c0-1.654-1.346-3-3-3h-6c-1.654,0-3,1.346-3,3v3.376C2.419,20.298,0,16.43,0,12,0,5.383,5.383,0,12,0s12,5.383,12,12c0,4.43-2.419,8.298-6,10.376Zm-2-12.376c0-2.206-1.794-4-4-4s-4,1.794-4,4,1.794,4,4,4,4-1.794,4-4Z"/>
            </svg>
          </div>
      </div>

      <div className="mb-4 relative" >
        {/* <label className="block text-gray-600 w-full">Password</label> */}
        <input type="password" name="password" className="w-full p-2 pl-7" placeholder="Password" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-1 text-gray-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19,8.424V7A7,7,0,0,0,5,7V8.424A5,5,0,0,0,2,13v6a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V13A5,5,0,0,0,19,8.424ZM7,7A5,5,0,0,1,17,7V8H7ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V13a3,3,0,0,1,3-3H17a3,3,0,0,1,3,3Z"/><path d="M12,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,12,14Z"/>
          </svg>
        </div>
      </div>

      <div className="mb-6 text-blue-500">
        <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
      </div>

        <button type="submit" className="bg-indigo-600 text-vulcan-50 w-full rounded-sm">Login</button>
      
      </form>
    
        </div>

      </div>
    </>

  );
};
