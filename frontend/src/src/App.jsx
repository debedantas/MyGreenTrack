import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/authProvider';
import { AdminPrivateRoute, PrivateRoute } from "./components/PrivateRoute"
import { Login } from './pages/Login'
import { Dicas } from './pages/dicas';
import { DicaPage } from './pages/DicaPage';
import { Register } from './pages/Register';
import { Habitos } from './pages/Habitos';
import { Pegada } from './pages/Pegada';
import { Admin } from './pages/Admin';

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
          <Route path="/dicas/:id" element={
            <PrivateRoute>
              <DicaPage />
            </PrivateRoute>
          } />
          <Route path="/habitos" element={
            <PrivateRoute>
              <Habitos />
            </PrivateRoute>
          } />
          <Route path="/pegada" element={
            <PrivateRoute>
              <Pegada />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <AdminPrivateRoute>
              <Admin />
            </AdminPrivateRoute>
          } />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
