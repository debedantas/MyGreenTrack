import { useAuth } from '../../context/authProvider';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const Header = ({ activePage = "Dicas" }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navigateTo = (endpoint) => {
        navigate(endpoint);
    }

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.greetings}>Olá, {user.full_name}</h1>
                <nav>
                    <ul className={styles.nav_list}>
                        {user.type === 'admin' && <li className={activePage === 'Admin' ? styles.active : ''} onClick={() => navigateTo("/admin")}>Admin</li>}
                        <li className={activePage === 'Dicas' ? styles.active : ''} onClick={() => navigateTo("/dicas")}>Dicas</li>
                        <li className={activePage === 'Habitos' ? styles.active : ''} onClick={() => navigateTo("/habitos")}>Hábitos</li>
                        <li className={activePage === 'Pegada' ? styles.active : ''} onClick={() => navigateTo("/pegada")}>Calculadora</li>
                        <li className={styles.logout}><button className={styles.logout} onClick={logout}>Sair</button></li>
                    </ul>
                </nav>
            </header>
            <h1 className={styles.title}>MyGreenTrack</h1>
        </>
    )
}