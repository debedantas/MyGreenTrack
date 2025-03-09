import { Header } from "../../components/Header";
import styles from "./styles.module.css";

export const Pegada = () => {

    return (
        <div className={styles.container}>
            <Header activePage="Pegada" />
            <section>
                <h2>Minha pegada</h2>
                <div>
                    <span>Calculadora de Pegada de Carbono</span>
                    <div>
                        <span>Informações básicas</span>
                        <div>
                            <label>Qual é o consumo mensal médio de eletricidade na sua casa? (em kWh)</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label>Quantos km você percorre semanalmente em carro/moto?</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label>Tipo de combustível</label>
                            <select id="cars" name="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="fiat">Fiat</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}