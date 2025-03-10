import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import styles from '../pages/Login/styles.module.css';
import { useNavigate } from "react-router-dom";
const notify = (notifyType, message) => notifyType(message);

export function RegisterForm() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!fullName || !email || !password) {
                notify(toast.error, "Preencha todos os campos");
                return;
            }
            // Replace with your actual login API URL
            const response = await axios.post('http://mygreentrack.onrender.com/auth/register', {
                full_name: fullName,
                email,
                password,
            });
            // const token = response.data.token;
            notify(toast.success, "Conta criada com sucesso");
            navigate('/login');
        } catch ({ status, response }) {
            if (status === 422) notify(toast.error, "Preencha todos os campos de forma correta");
            if (status === 409) notify(toast.error, "Email já cadastrado");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form_container}>
            <Toaster />
            <h3>Criar conta</h3>
            <input type="text" value={fullName} placeholder="Nome completo" onChange={(e) => setFullName(e.target.value)} />
            <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Criar conta</button>
            <span>Já tem uma conta? <a className={styles.bold} onClick={() => navigate("/login")}>Faça Login</a></span>
        </form>
    )
}