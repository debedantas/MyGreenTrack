import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export const Dica = ({ dica }) => {
    return (
        <Link to={`/dicas/${dica.id}`} key={dica.id} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <div key={dica.id} className={styles.card}>
                <img src={dica.image_link} alt={dica.title} className={styles.card_image} />
                <div className={styles.card_content}>
                    <p className={styles.card_meta}>{dica.author_name} • {dica.creation_date}</p>
                    <h3 className={styles.card_title}>{dica.title}</h3>
                    <p className={styles.card_summary}>{dica.summary}</p>
                    <div className={styles.tag_container}>
                        {/* {dica.tags.map((tag, index) => ( */}
                        <span className={styles.tag}>{dica.category}</span>
                        {/* ))} */}
                    </div>
                </div>
            </div>
        </Link>
    );
}