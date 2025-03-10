import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import styles from '../pages/Login/styles.module.css';

const notify = (notifyType, message) => notifyType(message);

export function LoginForm({ toggle }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                notify(toast.error, "Preencha todos os campos");
                return;
            }
            // Replace with your actual login API URL
            const loginResponse = await axios.post('http://mygreentrack.onrender.com/auth/login', {
                email,
                password,
            });

            const token = loginResponse.data.access_token;

            const response = await axios.get('http://mygreentrack.onrender.com/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { full_name, type } = response.data;

            login({ email, token, type, full_name });
            notify(toast.success, "Login efetuado com sucesso");
            navigate('/dicas');
        } catch (error) {
            notify(toast.error, "Email ou senha incorretos");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form_container}>
            <Toaster />
            <h3>Entrar</h3>
            <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            <span>Não tem conta? <a className={styles.bold} onClick={() => navigate("/register")}>Cadastre-se aqui</a></span>
        </form>
    )
}