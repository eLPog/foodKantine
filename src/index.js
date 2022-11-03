import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// @TODO podziękowanie po zamówieniu - modal Dziękujemy i po chwili sam się zamyka
// @TODO modal powitalny - witaj na stronie - zarejestruj sie/ zaloguj na testowe konto
// @TODO ikona w menu INFORMACJE i HISTORIA + komponenty
// @TODO zrobić ładny loading - ew. z nowego reacta ten loadingComponent (??)
