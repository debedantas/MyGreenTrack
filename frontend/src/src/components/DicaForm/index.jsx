import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/authProvider';

export const DicaForm = ({ onSubmit, styles }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [summary, setSummary] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [category, setCategory] = useState('Energia');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !author.trim()) {
            setError('Preencha os campos obrigatórios');
            return;
        }


        try {
            setIsSubmitting(true);

            const contentResponse = await axios.post('http://mygreentrack.onrender.com/content/', { html: content.trim() },
                {
                    headers: {
                        'Authorization': 'Bearer ' + user?.token
                    },
                }
            )

            const payload = {
                title: title.trim(),
                author_name: author.trim(),
                creation_date: date,
                summary: summary.trim(),
                image_link: imageLink.trim(),
                category,
                content_id: contentResponse.data.id
            };
            console.log(payload)

            await axios.post('http://mygreentrack.onrender.com/tip/create/', payload,
                {
                    headers: {
                        'Authorization': 'Bearer ' + user?.token
                    },
                }
            );

            onSubmit(true, "Dica publicada");

            // Reset form
            setTitle('');
            setAuthor('');
            setDate(new Date().toISOString().split('T')[0]);
            setSummary('');
            setImageLink('');
            setCategory('Energia');
            setContent('');
        } catch (err) {
            onSubmit(false, "Erro ao publicar dica");
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.checklistForm}>
            <h1>Criar nova Dica</h1>

            <div className={styles.formGroup}>
                <label>Título:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Autor:</label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Resumo:</label>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows="3"
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Link da imagem:</label>
                <input
                    type="text"
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label>Categoria:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.input}
                >
                    <option value="Energia">Energia</option>
                    <option value="Água">Água</option>
                    <option value="Sustentabilidade">Sustentabilidade</option>
                    <option value="De casa">De casa</option>
                    <option value="Plantação">Plantação</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Economia">Economia</option>
                    <option value="Reflorestamento">Reflorestamento</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Consumismo">Consumismo</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Conteúdo (HTML):</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="6"
                    placeholder="Insira o conteúdo HTML aqui..."
                    className={styles.input}
                    required
                />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Publicando...' : 'Publicar Dica'}
            </button>
        </form>
    );
};