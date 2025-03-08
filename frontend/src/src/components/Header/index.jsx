import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authProvider';
import axios from 'axios';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export const Header = ({ activePage = "Dicas" }) => {
    const { user, logout } = useAuth();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const navigateTo = (endpoint) => {
        navigate(endpoint);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:8000/user/me', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
                setName(res.data.full_name);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        if (user?.token) {
            fetchUserData();
        }
    }, []);


    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.greetings}>Olá, {name}</h1>
                <nav>
                    <ul className={styles.nav_list}>
                        <li className={activePage === 'Dicas' ? styles.active : ''} onClick={() => navigateTo("/dicas")}>Dicas</li>
                        <li className={activePage === 'Habitos' ? styles.active : ''} onClick={() => navigateTo("/habitos")}>Hábitos</li>
                        <li className={activePage === 'Pegada' ? styles.active : ''}>Pegada</li>
                        <li className={styles.logout}><button className={styles.logout} onClick={logout}>Sair</button></li>
                    </ul>
                </nav>
            </header>
            <h1 className={styles.title}>MyGreenTrack</h1>
        </>
    )
}