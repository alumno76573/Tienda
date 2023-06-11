import React, { Component } from "react";
import '../css/home.css';
import Header from './Header';
import FlipCard from './FlipCard';
import Coleccion from './Coleccion';
import Footer from './Footer';
import JSONproductos from '../json/productos.json';
import JSONcolecciones from '../json/colecciones.json';
import Login from "./Login";
import 'https://kit.fontawesome.com/2da7ac124d.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioAutenticado: {
        autenticado: false,
        idUsuario: null
      },
      carritoUsuario: null,
      mostrarTodosLosProductos: false,
      mostrarCarga: false
    };
  }

  actualizarEstadoAutenticado = (autenticado, idUsuario) => {
    this.setState(
      {
        usuarioAutenticado: {
          autenticado: autenticado,
          idUsuario: idUsuario
        }
      }, () => {
        console.log("EL valor de usuarioAutenticado es " + this.state.usuarioAutenticado.autenticado + 
                    "El valor del usuario es " + this.state.usuarioAutenticado.idUsuario);
      })
  }

  closePopUp = (e) => {
    e.preventDefault();
    const nesesitaRegistrarse = document.getElementById('dialog');
    nesesitaRegistrarse.close();
  }

  eliminarDelCarrito = (productoId) => {
    const { carritoUsuario } = this.state;
    if (!carritoUsuario) return;

    const carritoActualizado = carritoUsuario.productos.filter((producto) => producto.id !== productoId);
    this.setState({ carritoUsuario: { ...carritoUsuario, productos: carritoActualizado } });

    const carritosGuardados = localStorage.getItem('carritos');
    const carritos = JSON.parse(carritosGuardados) || [];
    const carritoIndex = carritos.findIndex((carrito) => carrito.id === this.state.usuarioAutenticado.idUsuario);
    if (carritoIndex !== -1) {
      carritos[carritoIndex].productos = carritoActualizado;
    }
    localStorage.setItem('carritos', JSON.stringify(carritos));
  };

  agregarAlCarrito = (idUsuario, producto) => {
    if (idUsuario != null) {
      const carritosGuardados = localStorage.getItem('carritos');
      let carritos = JSON.parse(carritosGuardados) || [];
      let carritoUsuario = carritos.find(carrito => carrito.id === idUsuario);

      if (!carritoUsuario) {
        carritoUsuario = {
          id: idUsuario,
          productos: [],
        };
        carritos.push(carritoUsuario);
      }

      const productoEnCarrito = carritoUsuario && carritoUsuario.productos && carritoUsuario.productos.length > 0
        ? carritoUsuario.productos.find((item) => item.id === producto.id)
        : null;

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        console.log("Aumentada la cantidad del producto")
      } else {
        carritoUsuario.productos = carritoUsuario.productos || [];
        carritoUsuario.productos.push({ ...producto, cantidad: 1 });
        console.log("Añadido nuevo producto")
      }
      localStorage.setItem('carritos', JSON.stringify(carritos));
      console.log(carritoUsuario);
      this.setState({ carritoUsuario });
    } else {
      const popUp = document.getElementById('dialog');
      popUp.showModal();
    }
  }

  toggleProductos = () => {
    this.mostrarCarga();
    this.setState((prevState) => ({
      mostrarTodosLosProductos: !prevState.mostrarTodosLosProductos
    }), () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    })
  }

  handleHomeClick = () => {
    this.mostrarCarga();
    this.setState({
      mostrarTodosLosProductos: false
    }, () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    })
  }

  mostrarCarga = () => {
    this.setState({ mostrarCarga: true }, () => {
      setTimeout(() => {
        this.setState({ mostrarCarga: false });
      }, 2000);
    });
  };

  componentDidMount() {
    if (this.state.usuarioAutenticado.autenticado) {
      const { usuarioAutenticado } = this.state;
      const carritosGuardados = localStorage.getItem('carritos');
      const carritos = JSON.parse(carritosGuardados);
      let carritoUsuario = null;

      if (carritos) {
        carritoUsuario = carritos.find((carrito) => carrito.id === usuarioAutenticado.idUsuario)
      }
      this.setState({ carritoUsuario });
    }
  }
  render() {
    const productos = JSONproductos;
    const colecciones = JSONcolecciones;

    let productosMostrados = productos.productos.slice(0, 9);
    if (this.state.mostrarTodosLosProductos) {
      productosMostrados = productos.productos;
    }

    return (
      <>
        {this.state.mostrarCarga && (
          <div className="pantalla_carga">
            <div className="rueda_carga"></div>
          </div>
        )}
        <div className="home">
          <Header
            usuarioAutenticado={this.state.usuarioAutenticado}
            actualizarEstadoAutenticado={this.actualizarEstadoAutenticado}
            idUsuario={this.state.usuarioAutenticado.idUsuario}
            carritoUsuario={this.state.carritoUsuario}
            eliminarDelCarrito={this.eliminarDelCarrito}
            handleHomeClick={this.handleHomeClick}
            mostrarCarga={this.mostrarCarga}
          />
          <div className='productos'>
            {!this.state.mostrarTodosLosProductos ? (
              <h1>Colección destacada</h1>
            ) : (
              <h1>Productos</h1>
            )}
            <ul className='lista-productos-home'>
              {productosMostrados.map(producto => (
                <li key={producto.id} className='producto'>
                  <FlipCard producto={producto} agregarAlCarrito={() => this.agregarAlCarrito(this.state.usuarioAutenticado.idUsuario, producto)} />
                </li>
              ))}
            </ul>
            {!this.state.mostrarTodosLosProductos && (
              <button className="ver_mas_productos" onClick={this.toggleProductos}>Ver más</button>
            )}
          </div>
          <div className={this.state.mostrarTodosLosProductos ? 'colecciones hidden' : 'colecciones'}>
            <h1>Colecciones</h1>
            <ul className='lista-colecciones'>
              {colecciones.colecciones.map(coleccion => (
                <li key={coleccion.id}>
                  <Coleccion coleccion={coleccion} onClick={this.toggleProductos} />
                </li>
              ))}
            </ul>
          </div>
          <dialog id="dialog">
            <h2>
              Regístrarte para poder añadir artículos al carrito
              <button className="closePopUp" onClick={this.closePopUp}><i class="fa-solid fa-x"></i></button>
            </h2>
          </dialog>
          <Footer />
        </div>
        <div className=' contenedor_login hidden'><Login actualizarEstadoAutenticado={this.actualizarEstadoAutenticado} mostrarCarga={this.mostrarCarga}/></div>
      </>
    )
  }
}

export default Home
