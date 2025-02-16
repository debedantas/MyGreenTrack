import { useState } from "react";
import "./dicas.css";
import imagePlaceHolder from "./image 1.png";

export default function MyGreenTrack() {
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
          className={page === num ? "active" : ""}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      );
      return acc;
    }, []);
  };


  return (
    <div className="container">
      <header className="header">
        <h1 className="title">MyGreenTrack</h1>
        <nav>
          <ul className="nav-list">
            <li className="active">Dicas</li>
            <li>Hábitos</li>
            <li>Pegada</li>
            <li className="logout">Sair</li>
          </ul>
        </nav>
      </header>

      <section className="tips-section">
        <h2 className="section-title">Dicas recentes</h2>
        <div className="grid-container">
          {todasDicas.slice(0, 3).map((dica) => (
            <div key={dica.id} className="card">
              <img src={dica.image} alt={dica.title} className="card-image" />
              <div className="card-content">
                <p className="card-meta">{dica.author} • {dica.date}</p>
                <h3 className="card-title">{dica.title}</h3>
                <div className="tag-container">
                  {dica.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tips-section">
        <h2 className="section-title">Todas as dicas</h2>
        <div className="grid-container">
          {todasDicas.map((dica) => (
            <div key={dica.id} className="card">
              <img src={dica.image} alt={dica.title} className="card-image" />
              <div className="card-content">
                <p className="card-meta">{dica.author} • {dica.date}</p>
                <h3 className="card-title">{dica.title}</h3>
                <div className="tag-container">
                  {dica.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => setPage(p => pages.includes(p - 1) ? p - 1 : p)}>&lt; Anterior</button>
          <div className="buttons">
            {renderPageNumbers()}
          </div>
          <button onClick={() => setPage(p => pages.includes(p + 1) ? p + 1 : p)}>Próximo &gt;</button>
        </div>
      </section>

      <footer className="footer">
        MyGreenTrack © 2025
      </footer>
    </div>
  );
}
