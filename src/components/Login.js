import React from 'react';
import image from '../imgs/logo-no-background.png';
import '../css/login.css';

function Login({actualizarEstadoAutenticado, mostrarCarga}){
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const usuariosGuardados = localStorage.getItem('usuarios');
    const usuarios = JSON.parse(usuariosGuardados);

    const usuarioValido = usuarios.find((usuario) => usuario.email === email && usuario.password === password);

    if (usuarioValido) {
      mostrarCarga();
      actualizarEstadoAutenticado(true, usuarioValido.id);
      document.getElementsByClassName("home")[0].classList.remove("hidden");
      document.getElementsByClassName("contenedor_login")[0].classList.add("hidden");
    } else {
      const error = document.getElementById("error");
      error.classList.remove("visible");
    }
  }
  return(
    <div className='login'>
      <div className='container'>
        <div><img className='logo' src={image} alt='Logo leifza'></img></div>
        <div className='formContainer'>
          <div className='fieldset'>
            <form className='form' onSubmit={handleSubmit}>
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td><label className='label' htmlFor='email'>Correo electrónico: </label></td>
                    <td><input id='email' type='email' placeholder='info@gmail.es'/></td>
                  </tr>
                  <tr className='espacio'></tr>
                  <tr>
                    <td><label className='label' htmlFor='password'>Contraseña: </label></td>
                    <td><input id='password' type='password' placeholder='secret password'></input></td>
                  </tr>
                </tbody>
              </table>
              <p id='error' className='error visible'>Credenciales incorrectas</p>
              <button type='submit' className='loginButton'>Iniciar sesión</button>
            </form>
          </div>
          <p><a href='/Registro' className='enlaceregistro'>¿No tienes cuenta? Registrate</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login