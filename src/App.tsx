import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calculator from './components/Calculator';
import './index.css';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
