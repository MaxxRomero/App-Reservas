import './App.css';
import Form  from './components/Form.tsx';
import Admin  from './components/Admin.tsx';
import Login  from './components/Login.tsx';
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div> 
  );
}

export default App;
