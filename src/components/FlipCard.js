import React from "react";
import '../css/flipCard.css';

function FlipCard({ producto, agregarAlCarrito }) {
  return (
    <main>
      <div className="front">
        <img className="imgfront" src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="back">
        <img className="imgback" src={producto.imagen} alt={producto.nombre} />
        <ul className="listaProps">
          <li className="nombrePrecio">
            <h4 className="nombre-producto">{producto.nombre}</h4>
            <p className="precio"><b>{producto.precio} €</b></p>
          </li>
          <li>{producto.descripcion}</li>
          <li>{producto.alto} cm de alto.</li>
          <li>{producto.ancho} cm de ancho</li>
          <li>{producto.peso} gramos de peso.</li>
          <li className="botonMixto">
            {producto.stock > 0 ? (
              <button className='añadirAlCarro' onClick={agregarAlCarrito}>Añadir al carrito</button>
            ) : (
              <button className='agotado'>Agotado</button>
            )}
          </li>
        </ul>
      </div>
    </main>
  );
}

export default FlipCard;