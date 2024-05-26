import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddNewBook from './components/AddNewBook';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path='/sample' element={<HomePage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/addnewbook' element={<AddNewBook />} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
