import React, { Component } from "react";
import '../css/paginaProductos.css';
import JSONproductos from '../json/productos.json';
import FlipCard from "./FlipCard";
import Header from "./Header";
import Footer from "./Footer";

class PaginaProducto extends Component{
  render(){
    const productos = JSONproductos;
    return(
      <div className="paginaProductos">
        <Header/>
        <h1 className="titulo">Lista de productos de la coleccion de Primavera</h1>
        <ul className='lista_total_productos'>
          {productos.productos.map(producto => (
            <li key={producto.id} className='producto'>
              <FlipCard producto={producto}/>
            </li>
          ))}
        </ul>
        <Footer/>
      </div>
    )
  }
}

export default PaginaProducto