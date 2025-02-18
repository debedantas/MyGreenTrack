import { useState } from "react";
import styles from "./styles.module.css";
import imagePlaceHolder from "./image 1.png";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import { Toaster } from "react-hot-toast";

export function Dicas() {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');

  (async () => {
    const res = await axios.get('http://localhost:8000/user/me', {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })

    setName(res.data.full_name)
  })();

  const [page, setPage] = useState(1);

  const pages = [1, 2, 3, 4, 5, 6, 7, 8];

  const todasDicas = [
    {
      id: 1,
      image: imagePlaceHolder,
      author: "Olivia Rhye",
      date: "1 Jan 2023",
      title: "Como a alimentação consciente pode ajudar o planeta",
      tags: ["Alimentação", "De casa"],
    },
    {
      id: 2,
      image: imagePlaceHolder,
      author: "Phoenix Baker",
      date: "1 Jan 2023",
      title: "Dicas de reflorestamento",
      tags: ["Plantaçao", "Reflorestamento"],
    },
    {
      id: 3,
      image: imagePlaceHolder,
      author: "Lana Steiner",
      date: "1 Jan 2023",
      title: "Sustentabilidade começa com energia",
      tags: ["Energia", "Sustentabilidade"],
    },
    {
      id: 4,
      image: imagePlaceHolder,
      author: "John Doe",
      date: "15 Jan 2023",
      title: "Reduza sua pegada de carbono com pequenas mudanças",
      tags: ["Carbono", "Sustentabilidade"],
    },
    {
      id: 5,
      image: imagePlaceHolder,
      author: "Sarah Kline",
      date: "20 Jan 2023",
      title: "Como escolher produtos sustentáveis",
      tags: ["Produtos", "Consumo Consciente"],
    },
    // Adicione outros itens aqui conforme necessário
  ];

  const renderPageNumbers = () => {
    const totalPages = pages.length;
    const firstPages = pages.slice(0, 3);
    const lastPages = pages.slice(totalPages - 3, totalPages);

    const middlePages = page > 3 && page < totalPages - 2 ? [page] : [];

    const pageNumbers = [...firstPages, ...middlePages, ...lastPages];

    return pageNumbers.reduce((acc, num, index) => {
      if (index > 0 && num - pageNumbers[index - 1] > 1) {
        acc.push(<button style={{ cursor: "unset" }} key={`ellipsis-${index}`}>...</button>);
      }
      acc.push(
        <button
          key={num}
          className={page === num ? styles.active : ""}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      );
      return acc;
    }, []);
  };


  return (
    <div className={styles.container}>
      <Toaster />
      <header className={styles.header}>
        <h1 className={styles.greetings}>Olá, {name}</h1>
        <nav>
          <ul className={styles.nav_list}>
            <li className={styles.active}>Dicas</li>
            <li>Hábitos</li>
            <li>Pegada</li>
            <li className={styles.logout}><button className={styles.logout} onClick={logout}>Sair</button></li>
          </ul>
        </nav>
      </header>

      <h1 className={styles.title}>MyGreenTrack</h1>

      <section className={styles.tips_section}>
        <h2 className={styles.section_title}>Dicas recentes</h2>
        <div className={styles.grid_container}>
          {todasDicas.slice(0, 3).map((dica) => (
            <div key={dica.id} className={styles.card}>
              <img src={dica.image} alt={dica.title} className={styles.card_image} />
              <div className={styles.card_content}>
                <p className={styles.card_meta}>{dica.author} • {dica.date}</p>
                <h3 className={styles.card_title}>{dica.title}</h3>
                <div className={styles.tag_container}>
                  {dica.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.tips_section}>
        <h2 className={styles.section_title}>Todas as dicas</h2>
        <div className={styles.grid_container}>
          {todasDicas.map((dica) => (
            <div key={dica.id} className={styles.card}>
              <img src={dica.image} alt={dica.title} className={styles.card_image} />
              <div className={styles.card_content}>
                <p className={styles.card_meta}>{dica.author} • {dica.date}</p>
                <h3 className={styles.card_title}>{dica.title}</h3>
                <div className={styles.tag_container}>
                  {dica.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <button onClick={() => setPage(p => pages.includes(p - 1) ? p - 1 : p)}>&lt; Anterior</button>
          <div className={styles.buttons}>
            {renderPageNumbers()}
          </div>
          <button onClick={() => setPage(p => pages.includes(p + 1) ? p + 1 : p)}>Próximo &gt;</button>
        </div>
      </section>

      <footer className={styles.footer}>
        MyGreenTrack © 2025
      </footer>
    </div>
  );
}
