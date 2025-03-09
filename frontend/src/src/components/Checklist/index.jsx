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

export const Checklist = React.memo(({ title, options }) => {
    const { user } = useAuth();

    const [checkboxes, setCheckboxes] = useState(options);

    const classes = [styles.green, styles.brown, styles.blue, styles.yellow];
    const item = useMemo(() => classes[Math.floor(Math.random() * classes.length)], []);

    const handleCheckboxChange = useCallback(async (id, checked) => {
        const response = await axios.put(`http://localhost:8000/user_checklist/${id}?checked=${checked}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`
                }
            }
        )

        if (response.status === 204) {
            setCheckboxes(prevCheckboxes =>
                prevCheckboxes.map(option =>
                    option.id === id ? { ...option, checked: !option.checked } : option
                )
            );
        }

    }, []);

    return (
        <div className={styles.container}>
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