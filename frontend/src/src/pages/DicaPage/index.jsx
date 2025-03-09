import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { use } from 'react';

export const DicaPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState({});

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/content/${id}`);
                setContent(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching tip:', error);
            }
        };

        fetchContent();
    });

    return (
        <div>
            <Header activePage="Dicas" />
            <h1>Dica {id}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <Footer />
        </div>
    );
};
