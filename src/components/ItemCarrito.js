import React from "react";
import 'https://kit.fontawesome.com/2da7ac124d.js';
import '../css/itemCarrito.css';

function ItemCarrito({ producto, eliminarDelCarrito}) {
  return (
    <>
      <li className="item-carrito">
        <img className="img_producto_carrito" src={producto.imagen} alt={producto.nombre} />
        <div>
          <h4 className="nombre-producto">{producto.nombre}</h4>
          <p>Cantidad: {producto.cantidad}</p>
          <p>Precio: {producto.precio}€</p>
        </div>
        <button className="eliminar" onClick={() => eliminarDelCarrito(producto.id)}>
          <i class="fa-solid fa-x"></i>
        </button>
      </li>
      <div className="divisor"></div>
    </>
  )
}
export default ItemCarrito