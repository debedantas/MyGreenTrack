import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

export function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}
