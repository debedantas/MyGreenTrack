import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/authProvider';
import { PrivateRoute } from "./components/PrivateRoute"
import { Login } from './pages/Login'
import { Dicas } from './pages/dicas';
import { Register } from './pages/Register';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {["/", "/dicas"].map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <Dicas />
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
