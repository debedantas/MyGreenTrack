import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/authProvider';
import { PrivateRoute } from "./components/PrivateRoute"
import { Login } from './pages/Login'
import { Dicas } from './pages/dicas';
import { Register } from './pages/Register';
import { Habitos } from './pages/Habitos';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dicas" element={
            <PrivateRoute>
              <Dicas />
            </PrivateRoute>
          } />
          <Route path="/habitos" element={
            <PrivateRoute>
              <Habitos />
            </PrivateRoute>
          } />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
