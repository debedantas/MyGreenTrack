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
                const response = await axios.get('http://mygreentrack.onrender.com/user_checklist', {
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

    const [allChecklists, setAllChecklists] = useState([]);
    const [metrics, setMetrics] = useState({
        totalHabits: 0,
        completedHabits: 0,
        completedChecklists: 0,
        completedByCategory: {}
    });

    // Fetch ALL checklists (remove pagination)
    useEffect(() => {
        const fetchAllChecklists = async () => {
            try {
                const response = await axios.get('http://mygreentrack.onrender.com/user_checklist/all', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                setAllChecklists(response.data);
                calculateMetrics(response.data);
            } catch (error) {
                console.error('Error fetching checklists:', error);
            }
        };

        if (user) fetchAllChecklists();
    }, [user]);

    // Calculate metrics from all checklists
    const calculateMetrics = (checklists) => {
        let completedHabits = 0;
        let completedChecklists = 0;
        const categoryCounts = {};

        checklists.forEach(checklist => {
            // Count completed habits
            const completedInChecklist = checklist.options.filter(option => option.checked).length;
            completedHabits += completedInChecklist;

            // Check if checklist is fully completed
            const isChecklistComplete = completedInChecklist === checklist.options.length;
            if (isChecklistComplete) {
                completedChecklists++;
                // Count by category
                const category = checklist.category.toLowerCase();
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });

        console.log(categoryCounts)
        setMetrics({
            totalHabits: checklists.reduce((acc, curr) => acc + curr.options.length, 0),
            completedHabits,
            completedChecklists,
            completedByCategory: categoryCounts
        });
    };

    // Get icon based on progress
    const getIcon = (current, target) => {
        if (current >= target) return checkmark;
        if (current >= Math.floor(target / 2)) return hourglass;
        return sleeping;
    };

    // Render meta items
    const renderMetaItem = (label, current, target) => (
        <li>
            <img src={getIcon(current, target)} alt="" />
            <span>{label} ({current}/{target})</span>
        </li>
    );

    const handleItemChange = () => {
        const fetchAllChecklists = async () => {
            try {
                const response = await axios.get('http://mygreentrack.onrender.com/user_checklist/all', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                setAllChecklists(response.data);
                calculateMetrics(response.data);
            } catch (error) {
                console.error('Error fetching checklists:', error);
            }
        };

        if (user) fetchAllChecklists();
    }

    return (
        <div className={styles.container}>
            <Header activePage="Habitos" />
            <section>
                <h2>Metas</h2>
                <div className={styles.metas_container}>
                    <ul>
                        {renderMetaItem('Concluir 1 hábito', metrics.completedHabits, 1)}
                        {renderMetaItem('Concluir 3 hábitos', metrics.completedHabits, 3)}
                        {renderMetaItem('Concluir 7 hábitos', metrics.completedHabits, 7)}
                        {renderMetaItem('Concluir 15 hábitos', metrics.completedHabits, 15)}
                    </ul>
                    <ul>
                        {renderMetaItem('Zerar 1 lista', metrics.completedChecklists, 1)}
                        {renderMetaItem('Zerar 3 listas', metrics.completedChecklists, 3)}
                        {renderMetaItem('Zerar 7 listas', metrics.completedChecklists, 7)}
                        {renderMetaItem('Zerar 15 listas', metrics.completedChecklists, 15)}
                    </ul>
                    <ul>
                        {renderMetaItem('Zerar 3 listas de economia', metrics.completedByCategory.economia || 0, 3)}
                        {renderMetaItem('Zerar 3 listas de sustentabilidade', metrics.completedByCategory.sustentabilidade || 0, 3)}
                        {renderMetaItem('Zerar 3 listas de mobilidade', metrics.completedByCategory.mobilidade || 0, 3)}
                        {renderMetaItem('Zerar 3 listas de consumo', metrics.completedByCategory.consumo || 0, 3)}
                    </ul>
                </div>
            </section>
            <section>
                <h2>Acompanhamento de Hábitos</h2>
                <div className={styles.checklist_container}>
                    {checklistsData.items.map((checklist) => (
                        <Checklist
                            key={checklist.id}
                            id={checklist.id}
                            title={checklist.title}
                            options={checklist.options}
                            onChange={handleItemChange}
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