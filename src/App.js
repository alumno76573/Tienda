import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { React } from 'react';
import Home from './components/Home';
import PaginaProducto from './components/PaginaProductos';
import Registro from './components/Registro';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/productos' component={PaginaProducto}/>
        <Route exact path='/registro' component={Registro}/>
      </Switch>
    </Router>
  );
}

export default App;
