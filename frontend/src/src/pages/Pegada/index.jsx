import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import styles from "./styles.module.css";
import axios from "axios";
import { useAuth } from "../../context/authProvider";

export const Pegada = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('calculator');
    const [values, setValues] = useState({
        eletricidade: "",
        gas: "",
        gasConsumo: "",
        transporte: "",
        combustivel: "",
        kmIndividual: "",
        eficiencia: "",
        transporteColetivo: "",
        kmColetivo: "",
        voo: "",
        kmAereo: ""
    });
    const [result, setResult] = useState(0);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:8000/history', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });

                if (response.status === 200) {
                    setHistory(response.data);
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        if (activeTab === 'results') {
            fetchHistory();
            setResult(0);
        }

    }, [activeTab]);

    const handleNumberInput = (e) => {
        const { name, value } = e.target;
        // Allow numbers and commas/periods, convert periods to commas, keep only first comma
        const filteredValue = value
            .replace(/[^0-9,.]/g, '')
            .replace(/\./g, ',')
            .replace(/,/g, (match, offset, str) =>
                offset === str.indexOf(',') ? ',' : ''
            );

        setValues(prev => ({ ...prev, [name]: filteredValue }));
    };

    const handleKeyDown = (e) => {
        // Allowed keys
        if (
            [8, 9, 13, 27, 37, 38, 39, 40, 46].includes(e.keyCode) || // Control keys
            (e.keyCode >= 48 && e.keyCode <= 57) || // Number keys
            (e.keyCode >= 96 && e.keyCode <= 105) || // Numpad keys
            e.key === ',' || e.key === '.' // Comma/period keys
        ) {
            // Prevent multiple commas
            if (e.key === ',' || e.key === '.') {
                if (e.target.value.includes(',')) {
                    e.preventDefault();
                }
            }
            return;
        }
        e.preventDefault();
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/history/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });

            if (response.status === 204) {
                setHistory(prev => prev.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error deleting history:', error);
        }
    };

    const saveResult = async (value) => {
        try {
            const response = await axios.post('http://localhost:8000/history', {
                value
            }, {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            });

            setValues({
                eletricidade: "",
                gas: "",
                gasConsumo: "",
                transporte: "",
                combustivel: "",
                kmIndividual: "",
                eficiencia: "",
                transporteColetivo: "",
                kmColetivo: "",
                voo: "",
                kmAereo: ""
            });
        } catch (error) {
            console.error('Error saving result:', error);
        }
    };

    const calculate = () => {
        const emissionFactors = {
            eletricidade: 0.08, // kg CO2/kWh
            botijao: 38.74, // kg CO2/botijão
            metros: 2.04, // kg CO2/m³
            gasolina: 2.28, // kg CO2/L
            etanol: 1.55, // kg CO2/L
            gnv: 2.04, // kg CO2/m³
            onibus: 1.1, // kg CO2/km
            metro: 0.02, // kg CO2/km
            domestico: 0.15, // kg CO2/km
            internacional: 0.11 // kg CO2/km
        }
        // Calculate the CO2 emissions
        // parseFloat is used to convert the string to a number  
        const eletricidade = parseFloat(values.eletricidade.replace(',', '.'));
        const gas = parseFloat(values.gasConsumo.replace(',', '.'));
        const kmIndividual = parseFloat(values.kmIndividual.replace(',', '.'));
        const kmColetivo = parseFloat(values.kmColetivo.replace(',', '.'));
        const kmAereo = parseFloat(values.kmAereo.replace(',', '.'));

        let totalEmissions = 0;
        if (eletricidade) {
            totalEmissions += eletricidade * emissionFactors.eletricidade;
        }
        if (values.gas && gas) {
            totalEmissions += gas * emissionFactors[values.gas];
        }
        if (values.transporte && kmIndividual && values.eficiencia) {
            if (values.transporte === 'moto' && values.combustivel === 'gnv') {
                totalEmissions += (kmIndividual / parseFloat(values.eficiencia)) * emissionFactors.gasolina;
            } else {
                totalEmissions += (kmIndividual / parseFloat(values.eficiencia)) * emissionFactors[values.combustivel];
            }
        }
        if (values.transporteColetivo && kmColetivo) {
            totalEmissions += kmColetivo * emissionFactors[values.transporteColetivo];
        }
        if (values.voo && kmAereo) {
            totalEmissions += kmAereo * emissionFactors[values.voo];
        }

        setResult(totalEmissions);
        if (totalEmissions) {
            saveResult(totalEmissions);
        }
    };

    return (
        <div className={styles.container}>
            <Header activePage="Pegada" />
            <section className={styles.mainContent}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'calculator' ? styles.active : ''}`}
                        onClick={() => setActiveTab('calculator')}
                    >
                        Calculadora
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'results' ? styles.active : ''}`}
                        onClick={() => setActiveTab('results')}
                    >
                        Histórico
                    </button>
                </div>

                {activeTab === 'calculator' ? (
                    <div className={styles.form}>
                        <h2>Calculadora de pegada de carbono</h2>
                        <div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="eletricidade">Qual é o consumo mensal médio de eletricidade na sua casa? (em kWh)</label>
                                <input
                                    id="eletricidade"
                                    type="text"
                                    name="eletricidade"
                                    value={values.eletricidade}
                                    onChange={handleNumberInput}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite o consumo em kWh"
                                />
                            </div>

                            <div className={styles.gridGroup}>
                                <label className={styles.span}>Qual é o consumo mensal médio de gás na sua casa?</label>
                                <select name="gas" id="gas" defaultValue=""
                                    onChange={(e) => setValues(prev => ({ ...prev, gas: e.target.value }))}
                                >
                                    <option value="" disabled>Selecione sua métrica</option>
                                    <option value="botijao">Quantidades de botijões</option>
                                    <option value="metros">m³</option>
                                </select>
                                <input
                                    type="text"
                                    name="gasConsumo"
                                    value={values.gasConsumo}
                                    onChange={handleNumberInput}
                                    onKeyDown={handleKeyDown}
                                    placeholder={`Digite o consumo ${values.gas === "" ? "" : values.gas === 'botijao' ? 'em botijões' : 'em m³'}`}
                                />
                            </div>

                            <div className={styles.gridGroup}>
                                <label className={styles.span}>Qual é o seu transporte individual?</label>
                                <select name="transporte" id="transporte" defaultValue=""
                                    onChange={(e) => setValues(prev => ({ ...prev, transporte: e.target.value }))}
                                    className={values.transporte === "bicicleta" ? styles.span : ""}
                                >
                                    <option value="" disabled>Selecione seu transporte</option>
                                    <option value="carro">Carro</option>
                                    <option value="moto">Moto</option>
                                    <option value="bicicleta">Bicicleta</option>
                                </select>
                                {values.transporte !== "bicicleta" && (
                                    <select name="combustivel" id="combustivel" defaultValue=""
                                        onChange={(e) => setValues(prev => ({ ...prev, combustivel: e.target.value }))}
                                    >
                                        <option value="" disabled>Selecione seu combustível</option>
                                        <option value="gasolina">Gasolina</option>
                                        <option value="etanol">Etanol</option>
                                        {values.transporte === "carro" && <option value="gnv">GNV</option>}
                                    </select>
                                )}
                                <div className={`${styles.side} ${styles.span}`}>
                                    <label htmlFor="kmIndividual">Qual é a kilometragem mensal?</label>
                                    <input
                                        type="text"
                                        id="kmIndividual"
                                        name="kmIndividual"
                                        value={values.kmIndividual}
                                        onChange={handleNumberInput}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Digite a kilometragem mensal"
                                    />
                                </div>
                                {(values.transporte === 'carro' || values.transporte === 'moto') && (
                                    <div className={`${styles.side} ${styles.span}`}>
                                        <label htmlFor="eficiencia">Qual é a eficiência  {values.transporte === 'carro' ? "do seu carro" : "da sua moto"} (Km/L ou Km/m³) </label>
                                        <input
                                            type="text"
                                            id="eficiencia"
                                            name="eficiencia"
                                            value={values.eficiencia}
                                            onChange={handleNumberInput}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Digite a eficiência do seu veículo"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className={styles.flexGroup}>
                                <label>Qual transporte coletivo você utiliza?</label>
                                <select name="transporteColetivo" id="transporteColetivo" defaultValue=""
                                    onChange={(e) => setValues(prev => ({ ...prev, transporteColetivo: e.target.value }))}
                                >
                                    <option value="" disabled>Selecione seu transporte</option>
                                    <option value="metro">Metrô</option>
                                    <option value="onibus">Ônibus</option>
                                </select>
                                <div className={styles.side}>
                                    <label htmlFor="kmColetivo">Qual é a kilometragem mensal?</label>
                                    <input
                                        type="text"
                                        id="kmColetivo"
                                        name="kmColetivo"
                                        value={values.kmColetivo}
                                        onChange={handleNumberInput}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Digite a kilometragem mensal"
                                    />
                                </div>
                            </div>

                            <div className={styles.flexGroup}>
                                <label>Transporte aéreo mensal</label>
                                <select name="voo" id="voo" defaultValue="">
                                    <option value="" disabled>Selecione o tipo de Vôo</option>
                                    <option value="domestico">Doméstico</option>
                                    <option value="internacional">Internacional</option>
                                </select>
                                <div className={styles.side}>
                                    <label htmlFor="kmAereo">Qual é a kilometragem mensal?</label>
                                    <input
                                        type="text"
                                        id="kmAereo"
                                        name="kmAereo"
                                        value={values.kmAereo}
                                        onChange={handleNumberInput}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Digite a kilometragem mensal"
                                    />
                                </div>
                            </div>

                            <button onClick={calculate}>Calcular</button>
                        </div>
                        <div className={styles.result}>
                            <p>Emissão mensal total (kg CO2/mês):</p>
                            <h3>{result.toFixed(1).replace(".", ",")}</h3>
                        </div>
                    </div>
                ) : (
                    <div>
                        {history.map((item, index) => (
                            <div key={index} className={`${styles.result} ${styles.history}`}>
                                <span
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(item.id)}
                                    title="Excluir registro"
                                >
                                    🗑️  {/* Or use an SVG icon */}
                                </span>
                                <h4>Resultado do dia {formatDate(item.created_at).replace(",", " às")}</h4>
                                <span>Emissão mensal total (kg CO2/mês): <span className={styles.highlight}>{item.value.toString().replace(".", ",")}</span></span>
                            </div>
                        ))}
                    </div>
                )}
            </section >
        </div >
    );
}

const formatDate = (dateString) => {
    console.log(dateString)
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};