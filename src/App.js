import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from './components/Header/Header.js';
import Sidebar from './components/Sidebar/Sidebar';
import Evaluation from './components/Evaluation/Evaluation';

function App() {
  useEffect(() => {
    // Acceder a los valores almacenados en cookies
    const scSessionCookie = document.cookie.replace(/(?:(?:^|.*;\s*)sc_session\s*=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(scSessionCookie);

    // Acceder a los valores almacenados en el almacenamiento local
    const dataName = localStorage.getItem("data_name");
    const dataPhone = localStorage.getItem("data_phone");
    const sessionId = localStorage.getItem("session_id");
    const tokenId = localStorage.getItem("token_id");
    const userTu = localStorage.getItem("user_tu");

    console.log(dataName);
    console.log(dataPhone);
    console.log(sessionId);
    console.log(tokenId);
    console.log(userTu);
  }, []);

  return (
    <Router>
      <div className="app">
        {/* <Sidebar/>
        <Header /> */}
        <Evaluation/>
        <Switch>
          <Route exact path="/soporte">
            {/* Componente correspondiente a la ruta /soporte */}
          </Route>
          <Route exact path="/tiendas">
            {/* Componente correspondiente a la ruta /tiendas */}
          </Route>
          <Route exact path="/reportes">
            {/* Componente correspondiente a la ruta /reportes */}
          </Route>
          {/* Agrega más rutas y componentes según sea necesario */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
