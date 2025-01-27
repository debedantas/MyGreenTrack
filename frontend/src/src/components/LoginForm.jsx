export function LoginForm({ toggle }) {
    return (
        <div className="form-container">
            <h3>Entrar</h3>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Senha" />
            <button>Login</button>
            <span>Não tem conta? <a className="bold" onClick={() => toggle()}>Cadastre-se aqui</a></span>
        </div>
    )
}