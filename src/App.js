import logo from './logo.svg';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer'
import Meals from './Components/Meals';
import Categorys from './Components/Categorys';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      
      <Routes>
        <Route exact path="/" element={<Meals/>}/>
        <Route exact path="/Categorys" element={<Categorys/>}/>
      </Routes>

      <Footer/>
      </Router>
    </div>
  );
}

export default App;
