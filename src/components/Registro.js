import React, { Component } from 'react';
import image from '../imgs/logo-no-background.png';
import '../css/registro.css';

class Registro extends Component{
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      repeatPassword: ''
    };
  }

  goLogin = (e) => {
    e.preventDefault();
    const popUp = document.getElementById('dialog');
    popUp.close();
    window.location.href='/'
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {nombre, apellido, email, password, repeatPassword} = this.state;

    if (password !== repeatPassword) {
      document.getElementById('error').classList.remove('visible');
    } else {
      let id =Math.random().toString();
      const nuevoUsuario = {
        id: id,
        nombre,
        apellido,
        email,
        password
      };
      const nuevoCarrito = {
        id: id,
        carrito: {
          productos: [],
          total: 0
        }
      }
  
      const usuariosGuardados = localStorage.getItem('usuarios');
      const carritosGuardados = localStorage.getItem('carritos');
      const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
      const carritos = carritosGuardados ? JSON.parse(carritosGuardados) : [];
      usuarios.push(nuevoUsuario);
      carritos.push(nuevoCarrito);

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('carritos', JSON.stringify(carritos));
      this.setState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repeatPassword: ''
      });
      const popUp = document.getElementById('dialog');
      popUp.showModal();
    }
  }
  render() {
    return(
      <div className='registro'>
          <div className='container'>
          <div><img className='logo' src={image} alt='Logo leifza'></img></div>
          <div className='formContainer'>
            <div className='fieldset'>
              <form className='form' onSubmit={this.handleSubmit}>
                <table>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td><label className='label' htmlFor='nombre'>Nombre: </label></td>
                      <td><input id='nombre' type='text' placeholder='Ramiro' value={this.state.nombre} onChange={(e) => this.setState({nombre: e.target.value})}></input></td>
                    </tr>
                    <tr className='espacio'></tr>
                    <tr>
                      <td><label className='label' htmlFor='apellido'>Apellido: </label></td>
                      <td><input id='apellido' type='text' placeholder='Pérez' value={this.state.apellido} onChange={(e) => this.setState({apellido: e.target.value})}></input></td>
                    </tr>
                    <tr className='espacio'></tr>
                    <tr>
                      <td><label className='label' htmlFor='email'>Correo electrónico: </label></td>
                      <td><input id='email' type='email' placeholder='info@gmail.es' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/></td>
                    </tr>
                    <tr className='espacio'></tr>
                    <tr>
                      <td><label className='label' htmlFor='password'>Contraseña: </label></td>
                      <td><input id='password' type='password' placeholder='secret password' value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}></input></td>
                    </tr>
                    <tr className='espacio'></tr>
                    <tr>
                      <td><label className='label' htmlFor='repeatPassword'>Repetir contraseña: </label></td>
                      <td><input id='repeatPassword' type='password' placeholder='secret password' value={this.state.repeatPassword} onChange={(e) => this.setState({repeatPassword: e.target.value})}></input></td>
                    </tr>
                  </tbody>
                </table>
                <p id='error' className='error visible'>Las contraseñas no coinciden</p>
                <button type='submit' className='loginButton'>Registrar</button>
              </form>
            </div>
          </div>
        </div>
        <dialog id='dialog'>
          <h2>Se ha registrado correctamente</h2>
          <button className='btn_irLogin' onClick={this.goLogin}>Ir al Login</button>
        </dialog>
      </div>
    )
  }
}

export default Registro