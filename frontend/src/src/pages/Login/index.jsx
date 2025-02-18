import { useState } from "react"
import { LoginForm } from "../../components/LoginForm"
import { RegisterForm } from "../../components/RegisterForm"
import styles from "./styles.module.css"

export function Login() {
    const [showLogin, setShowLogin] = useState(true)

    function toggleLogin() {
        setShowLogin(value => !value);
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.side_container}>
                    <p>A melhor maneira de acompanhar a sua <span className={styles.bold}>pegada</span> de carbono</p>
                    <h3>MyGreenTrack</h3>
                </div>
                <div className={styles.login_container}>
                    {showLogin ? <LoginForm toggle={toggleLogin} /> : <RegisterForm toggle={toggleLogin} />}
                </div>
            </div>
        </div>
    )
}