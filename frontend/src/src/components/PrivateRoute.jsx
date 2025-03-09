import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

export function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

export function AdminPrivateRoute({ children }) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (!user.type === 'admin') return <Navigate to="/*" />;
    return children;
}