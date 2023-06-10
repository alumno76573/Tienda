import React from "react";
import '../css/footer.css';
import 'https://kit.fontawesome.com/2da7ac124d.js';

function Footer() {
  return (
    <div className="footer">
      <div className="enlaces">
        <h3>Enlaces rápidos</h3>
        <ul>
          <li><a className="enlaceFooter" href="#">Política de privacidad</a></li>
          <li><a className="enlaceFooter" href="#">Política de cookies</a></li>
          <li><a className="enlaceFooter" href="#">Política de envío</a></li>
          <li><a className="enlaceFooter" href="#">Página de FAQs</a></li>
        </ul>
      </div>
      <div className="comunicacion">
        <h3>¿Cómo comunicarse con nosotros?</h3>
        <p>
          Dado que no somos una empresa muy grande no tenemos una
          sección de atención al cliente, pero aún así puede comunicarse con nosotros mediante
          correo electrónico <a className="enlaceFooter" href="#">info-ayuda@leifza.com</a>, tenga en cuenta que dependiendo de las peticiones que recibamos
          nos demoraremos más tiempo en poder responderle.
        </p>
        <p>Agradecemos su paciencia</p>
      </div>
      <div className="redes_sociales">
        <h3>Redes Sociales</h3>
        <ul className="lista-iconos">
          <li><i class="redIcono fa-brands fa-instagram"></i></li>
          <li><i class="redIcono fa-brands fa-facebook"></i></li>
          <li><i class="redIcono fa-brands fa-twitter"></i></li>
          <li><i class="redIcono fa-brands fa-tiktok"></i></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer