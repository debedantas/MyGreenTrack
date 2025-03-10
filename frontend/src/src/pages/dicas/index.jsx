import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import imagePlaceHolder from "./image 1.png";
import { Toaster } from "react-hot-toast";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import axios from "axios";
import { Dica } from "../../components/Dica";

export function Dicas() {
  const [recentTips, setRecentTips] = useState([]);
  const [allTips, setAllTips] = useState({
    items: [],
    totalPages: 1,
    currentPage: 1
  });
  const [currentPage, setCurrentPage] = useState(1);

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
    const fetchAllTips = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tip', {
          params: {
            page: currentPage
          },
        });
        setAllTips({
          items: response.data.items,
          totalPages: response.data.total_pages,
          currentPage: response.data.current_page
        });
      } catch (error) {
        console.error('Error fetching checklists:', error);
      }
    };

    fetchAllTips();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= allTips.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= allTips.totalPages; i++) {
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
      <Toaster />
      <Header activePage="Dicas" />

      <section className={styles.tips_section}>
        <h2 className={styles.section_title}>Dicas recentes</h2>
        <div className={styles.grid_container}>
          {recentTips.map((dica) => (
            <Dica key={dica.id} dica={dica} />
          ))}
        </div>
      </section>

      <section className={styles.tips_section}>
        <h2 className={styles.section_title}>Todas as dicas</h2>
        <div className={styles.grid_container}>
          {allTips.items.map((dica) => (
            <Dica key={dica.id} dica={dica} />
          ))}
        </div>
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
            disabled={currentPage === allTips.totalPages}
          >
            Próximo &gt;
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
