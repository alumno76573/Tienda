import React, { useEffect, useState } from 'react';
import '../css/header.css';
import image from '../imgs/logo-no-background.png';
import 'https://kit.fontawesome.com/2da7ac124d.js';
import ItemCarrito from './ItemCarrito';

function Header({ usuarioAutenticado, actualizarEstadoAutenticado, idUsuario, carritoUsuario, eliminarDelCarrito, handleHomeClick, mostrarCarga }) {
  const [cantidadItems, setCantidadItems] = useState(0);

  const logout = () => {
    actualizarEstadoAutenticado(false, null);
  };

  const loginFunction = () => {
    mostrarCarga();
    document.getElementsByClassName('home')[0].classList.add('hidden');
    document.getElementsByClassName('contenedor_login')[0].classList.remove('hidden');
  };

  const mostrarCarrito = () => {
    const carritoElement = document.getElementById('carrito');
    if (carritoElement) {
      carritoElement.classList.toggle('hidden');
    }
  };

  useEffect(() => {
    const carritosGuardados = localStorage.getItem('carritos');
    const carritos = JSON.parse(carritosGuardados);
    let totalItems = 0;

    if (carritos) {
      const carritoUsuario = carritos.find((carrito) => carrito.id === idUsuario);
      console.log(carritoUsuario);

      if (carritoUsuario && carritoUsuario.productos) {
        carritoUsuario.productos.forEach((producto) => {
          totalItems += producto.cantidad;
        });
      }
    }
    setCantidadItems(totalItems);
  }, [idUsuario]);

  function calcularPrecioTotal(productos) {
    let total = 0;
    productos.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    return total;
  }

  const handleHomeIconClick = () => {
    handleHomeClick();
    const carritoElement = document.getElementById('carrito');
    if (carritoElement && !carritoElement.classList.contains('hidden')) {
      carritoElement.classList.add('hidden');
    }
  }

  return (
    <>
      <div className='header'>
        <div>
          <img className='logo' src={image} alt='Logo Leifza' />
        </div>
        <div className='slogan'>
          <h2>Pendientes únicos para clientes únicos</h2>
        </div>
        <div className='iconos'>
          <ul className='lista-iconos'>
            <li>
              <i className='icon fa-solid fa-magnifying-glass'></i>
            </li>
            <li>
              {usuarioAutenticado === true ? (
                <a href='/perfil'>
                  <i className='icon fa-solid fa-user'></i>
                </a>
              ) : (
                <i onClick={() => loginFunction()} className='icon fa-solid fa-user'></i>
              )}
            </li>
            <li>
              <i className='icon fa-solid fa-cart-shopping' onClick={mostrarCarrito}></i>
              {usuarioAutenticado === true ? (
                <span className='cantidad-items'>{cantidadItems}</span>
              ) : (
                <p className='visible'>Nada</p>
              )}
              {usuarioAutenticado && (
                <div id='carrito' className='carrito hidden'>
                  {carritoUsuario && carritoUsuario.productos && carritoUsuario.productos.length > 0 ? (
                    <>
                      <h3>Carrito</h3>
                      <ul className='lista-items-carrito'>
                        {carritoUsuario.productos.map((producto) => (
                          <ItemCarrito
                            key={producto.id}
                            producto={producto}
                            eliminarDelCarrito={eliminarDelCarrito}
                          />
                        ))}
                        <li className='precio-total'>
                          <h4>Total:</h4>
                          <p>{calcularPrecioTotal(carritoUsuario.productos)} €</p>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p>Su carrito está vacío.</p>
                  )}
                </div>
              )}
            </li>
            <li>
              <i className='icon fa-solid fa-house' onClick={handleHomeIconClick}></i>
            </li>
          </ul>
        </div>
      </div>
      <div className='imagen'></div>
    </>
  );
}

export default Header;
