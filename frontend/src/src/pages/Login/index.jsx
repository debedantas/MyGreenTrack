import { useState } from "react"
import { LoginForm } from "../../components/LoginForm"
import { RegisterForm } from "../../components/RegisterForm"
import "./styles.css"

export function Login() {
    const [showLogin, setShowLogin] = useState(true)

    function toggleLogin() {
        setShowLogin(value => !value);
    }

    return (
        <div className="body">
            <div className="container">
                <div className="side-container">
                    <p>A melhor maneira de acompanhar a sua <span className="bold">pegada</span> de carbono</p>
                    <h3>MyGreenTrack</h3>
                </div>
                <div className="login-container">
                    {showLogin ? <LoginForm toggle={toggleLogin} /> : <RegisterForm toggle={toggleLogin} />}
                </div>
            </div>
        </div>
    )
}