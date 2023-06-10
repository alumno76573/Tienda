import React from "react";
import '../css/coleccion.css';

function Coleccion(coleccion) {
  return (
    <div id={coleccion.coleccion.id} className="coleccion" onClick={coleccion.onClick} style={{ backgroundImage: `url(${coleccion.coleccion.imagen})` }}>
      <div className="contenedor_coleccion"><p className="nombre_coleccion">{coleccion.coleccion.nombre}</p></div>
    </div>
  )
}

export default Coleccion