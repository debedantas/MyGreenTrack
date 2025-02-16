import { useState } from "react";
import "./dicas.css";
import imagePlaceHolder from "./image 1.png"

export default function MyGreenTrack() {
  const [page, setPage] = useState(1);

  const dicasRecentes = [
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
  ];

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
      <section className="recent-section">
        <h2 className="section-title">Dicas recentes</h2>
        <div className="grid-container">
          {dicasRecentes.map((dica) => (
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
      <footer className="footer">
        MyGreenTrack © 2025
      </footer>
    </div>
  );
}
