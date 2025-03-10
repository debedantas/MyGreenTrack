import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/authProvider';

export const ChecklistForm = ({ onSubmit, styles }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Economia');
    const [itemInput, setItemInput] = useState('');
    const [items, setItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (itemInput.trim()) {
            setItems(prev => [...prev, itemInput.trim()]);
            setItemInput('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || items.length === 0) {
            return;
        }

        const payload = {
            title: title.trim(),
            category: category.trim(),
            options: items.map(item => ({ option_text: item }))
        };

        try {
            setIsSubmitting(true);

            // Exemplo de chamada API
            await axios.post('http://localhost:8000/checklist/', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user?.token
                    },
                }
            );

            onSubmit(true, "Checklist criada"); // Passa os dados para o componente pai
            setTitle('');
            setCategory('Economia');
            setItems([]);
        } catch (err) {
            console.log(err)
            onSubmit(false, "Erro ao criar checklist"); // Passa os dados para o componente pai
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.checklistForm}>
            <h1>Criar nova Lista de Hábitos</h1>

            <div className={styles.formGroup}>
                <label>Título do Checklist:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Categoria:</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.input}
                >
                    <option value="Economia">Economia</option>
                    <option value="Sustentabilidade">Sustentabilidade</option>
                    <option value="Mobilidade">Mobilidade</option>
                    <option value="Consumo">Consumo</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Adicionar Item:</label>
                <div className={styles.itemInputContainer}>
                    <input
                        type="text"
                        value={itemInput}
                        onChange={(e) => setItemInput(e.target.value)}
                        className={styles.input}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddItem(e)}
                    />
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className={styles.addButton}
                    >
                        Adicionar Item
                    </button>
                </div>
            </div>

            {items.length > 0 && (
                <div className={styles.itemsPreview}>
                    <h3>Itens Adicionados:</h3>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Salvando...' : 'Salvar Checklist'}
            </button>
        </form>
    );
};