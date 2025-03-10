import React, { useCallback, useState, useMemo } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useAuth } from '../../context/authProvider';

const Checkbox = React.memo(({ option, onChange }) => {
    return (
        <li className={styles.checkbox_wrapper}>
            <input
                className={styles.substituted}
                type="checkbox"
                id={option.id}
                checked={option.checked}
                onChange={() => onChange(option.id, !option.checked)}
            />
            <label htmlFor={option.id}>{option.option_text}</label>
        </li>
    );
});

export const Checklist = React.memo(({ id, title, options, onChange }) => {
    const { user } = useAuth();

    const [checkboxes, setCheckboxes] = useState(options);

    const classes = [styles.green, styles.brown, styles.blue, styles.yellow];
    const item = useMemo(() => classes[Math.floor(Math.random() * classes.length)], []);

    const handleCheckboxChange = useCallback(async (id, checked) => {
        const response = await axios.put(`http://mygreentrack.onrender.com/user_checklist/${id}?checked=${checked}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }
        )

        if (response.status === 204) {
            onChange();
            setCheckboxes(prevCheckboxes =>
                prevCheckboxes.map(option =>
                    option.id === id ? { ...option, checked: !option.checked } : option
                )
            );
        }

    }, []);

    const handleDelete = useCallback(async (id) => {
        const response = await axios.delete(`http://mygreentrack.onrender.com/checklist/${id}`, {
            headers: {
                Authorization: `Bearer ${user?.token}`
            }
        });

        if (response.status === 204) {
            // refreshPage
            const navigate = window.location.reload();
            navigate();
        }
    }, []);

    return (
        <div className={`${styles.container} ${styles.relative}`}>
            {user?.type === 'admin' && (
                <span
                    className={styles.deleteButton}
                    onClick={() => handleDelete(id)}
                    title="Excluir hábito"
                >
                    🗑️  {/* Or use an SVG icon */}
                </span>
            )}
            <h3 className={item}>{title}</h3>
            <h4>Hábitos</h4>
            <ul>
                {checkboxes.map(option => (
                    <Checkbox key={option.id} option={option} onChange={handleCheckboxChange} />
                ))}
            </ul>
            <progress
                value={checkboxes.filter(option => option.checked).length}
                max={checkboxes.length}
                className={checkboxes.filter(option => option.checked).length === checkboxes.length ? styles.all_checked : ""}
            />
        </div>
    );
});