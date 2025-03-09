import { useState } from 'react';
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ChecklistForm } from "../../components/ChecklistForm";
import { DicaForm } from "../../components/DicaForm";
import styles from './styles.module.css';
import toast, { Toaster } from 'react-hot-toast';

export const Admin = () => {
    const [activeTab, setActiveTab] = useState('checklist');

    const handleFormSubmit = (ok, msg) => {
        if (!ok) {
            toast.error(msg);
            return;
        }
        toast.success(msg);
    };

    return (
        <div className={styles.container}>
            <Toaster />
            <Header activePage="Admin" />

            <main className={styles.mainContent}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'checklist' ? styles.active : ''}`}
                        onClick={() => setActiveTab('checklist')}
                    >
                        Hábitos
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'dica' ? styles.active : ''}`}
                        onClick={() => setActiveTab('dica')}
                    >
                        Dicas
                    </button>
                </div>

                {activeTab === 'checklist'
                    ? <ChecklistForm onSubmit={handleFormSubmit} styles={styles} />
                    : <DicaForm onSubmit={handleFormSubmit} styles={styles} />}
            </main>

            <Footer />
        </div>
    );
};