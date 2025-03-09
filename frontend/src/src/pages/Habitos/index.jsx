import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import styles from './styles.module.css';
import checkmark from './assets/checkmark.svg';
import hourglass from './assets/hourglass.svg';
import sleeping from './assets/sleeping.svg';
import { Checklist } from "../../components/Checklist";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import { useEffect, useState } from "react";


export const Habitos = () => {
    const { user } = useAuth();
    const [checklistsData, setChecklistsData] = useState({
        items: [],
        totalPages: 1,
        currentPage: 1
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchChecklists = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user_checklist', {
                    params: {
                        page: currentPage
                    },
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                setChecklistsData({
                    items: response.data.items,
                    totalPages: response.data.total_pages,
                    currentPage: response.data.current_page
                });
            } catch (error) {
                console.error('Error fetching checklists:', error);
            }
        };

        fetchChecklists();
    }, [user, currentPage]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= checklistsData.totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= checklistsData.totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? styles.active : ''}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className={styles.container}>
            <Header activePage="Habitos" />
            <section>
                <h2>Metas</h2>
                <div className={styles.metas_container}>
                    <ul>
                        <li>
                            <img src={checkmark} alt="" />
                            <span>Concluir 1 hábito</span>
                        </li>
                        <li>
                            <img src={hourglass} alt="" />
                            <span>Concluir 5 hábitos</span>
                        </li>
                        <li>
                            <img src={sleeping} alt="" />
                            <span>Concluir 10 hábitos</span>
                        </li>
                        <li>
                            <img src={sleeping} alt="" />
                            <span>Concluir 30 hábitos</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <img src={checkmark} alt="" />
                            <span>Zerar 1 lista</span>
                        </li>
                        <li>
                            <img src={hourglass} alt="" />
                            <span>Zerar 3 listas</span>
                        </li>
                        <li>
                            <img src={sleeping} alt="" />
                            <span>Zerar 5 listas</span>
                        </li>
                        <li>
                            <img src={sleeping} alt="" />
                            <span>Zerar 10 listas</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <img src={checkmark} alt="" />
                            <span>Zerar 3 listas de reciclagem</span>
                        </li>
                        <li>
                            <img src={hourglass} alt="" />
                            <span>Zerar 3 listas de economia</span>
                        </li>
                        <li>
                            <img src={sleeping} alt="" />
                            <span>Zerar 3 listas de sustentabilidade</span>
                        </li>
                        <li>
                            <img src={sleeping} alt="" />
                            <span>Zerar 3 listas de eletricidade</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <h2>Acompanhamento de Hábitos</h2>
                <div className={styles.checklist_container}>
                    {checklistsData.items.map((checklist) => (
                        <Checklist
                            key={checklist.id}
                            title={checklist.title}
                            options={checklist.options}
                        />
                    ))}
                </div>
                {checklistsData.totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt; Anterior
                        </button>
                        <div className={styles.buttons}>
                            {renderPageNumbers()}
                        </div>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === checklistsData.totalPages}
                        >
                            Próximo &gt;
                        </button>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}