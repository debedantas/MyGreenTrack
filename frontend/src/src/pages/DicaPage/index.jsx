import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import styles from './styles.module.css';
import { Dica } from '../../components/Dica';
import { useAuth } from '../../context/authProvider';

const formatDate = (dateString) => {
    console.log(dateString)
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date);
};

export const DicaPage = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [content, setContent] = useState({});
    const [tip, setTip] = useState({});
    const [recentTips, setRecentTips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentTips = async () => {
            const response = await axios.get('http://localhost:8000/tip', {
                params: {
                    page: 0
                },
            });
            setRecentTips(response.data.items);
        }
        fetchRecentTips();
    }, []);


    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/tip/tip_id/${id}`);
                setTip(response.data);
                const contentResponse = await axios.get(`http://localhost:8000/content/${response.data.content_id}`);
                setContent(contentResponse.data.html);

            } catch (error) {
                console.error('Error fetching tip:', error);
            }
        };

        fetchContent();
    }, [id]);

    const handleDelete = useCallback(async (id) => {
        const response = await axios.delete(`http://localhost:8000/tip/${id}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });

        if (response.status === 204) {
            navigate("/dicas");
        }
    }, []);

    return (
        <div className={styles.container}>
            <Header activePage="Dicas" />
            <main className={styles.mainContent}>
                <section className={styles.recentTipsSection}>
                    <h2>Dicas recentes</h2>
                    <div className={styles.recentTips}>
                        {recentTips.map((dica) => (
                            <Dica dica={dica} key={dica.id} />
                        ))}
                    </div>
                </section>

                <div className={`${styles.tipContent} ${styles.relative}`}>
                    {user?.type === 'admin' && (
                        <span
                            className={styles.deleteButton}
                            onClick={() => handleDelete(id)}
                            title="Excluir dica"
                        >
                            🗑️  {/* Or use an SVG icon */}
                        </span>
                    )}
                    <span className={styles.tipContent__date}>{tip.creation_date !== undefined && formatDate(tip.creation_date)}</span>
                    <h1 className={styles.tipContent__title}>{tip.title}</h1>
                    <img src={tip.image_link} alt="" />
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </main>
            <Footer />
        </div>
    );
};
