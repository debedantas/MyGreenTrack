export function RegisterForm({ toggle }) {
    return (
        <div className="form-container">
            <h3>Criar conta</h3>
            <input type="text" placeholder="Nome completo" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Senha" />
            <button>Login</button>
            <span>Já tem uma conta? <a className="bold" onClick={() => toggle()}>Faça Login</a></span>
        </div>
    )
}