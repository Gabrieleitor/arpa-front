import React, {useState} from 'react';

import type {Device} from '../../domain/entities/Device';
import styles from './RegisterDeviceForm.module.css';
import type {IdentificationType} from "../../domain/entities/IdentificationType";
import type {ArticleType} from "../../domain/entities/ArticleType";
import type {Make} from "../../domain/entities/Make.ts";
import type {PersonType} from "../../domain/entities/PersonType.ts";

interface RegisterDeviceFormProps {
    identificationTypes: IdentificationType[];
    articleTypes: ArticleType[];
    makes: Make[];
    personTypes: PersonType[];
    onSubmit: (device: Device) => void;
    loading: boolean;
    error: string | null;
}

interface FormState {
    identificacion: string;
    firstName: string;
    lastName: string;
    identificationType: IdentificationType | null;
    articleType: ArticleType | null;
    make: Make | null;
    personType: PersonType | null;
    serial: string;
    descripcion: string;
}

export const RegisterDeviceForm: React.FC<RegisterDeviceFormProps> =
    ({identificationTypes, articleTypes, makes, personTypes, onSubmit, loading, error}) => {
        const [form, setForm] = useState<FormState>({
            identificacion: '',
            firstName: '',
            lastName: '',
            identificationType: null,
            articleType: null,
            make: null,
            personType: null,
            serial: '',
            descripcion: '',
        });
        const [formError, setFormError] = useState<string | null>(null);

        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
        ) => {
            const {name, value} = e.target;
            setForm({
                ...form,
                [name]: name === 'identificationType' || name === 'articleType' || name === 'make' || name === 'personType'
                    ? identificationTypes.find(type => type.id === Number(value))
                    || articleTypes.find(type => type.id === Number(value))
                    || personTypes.find(type => type.id === Number(value))
                    || makes.find(type => type.id === Number(value))
                    : value,
            });
            setFormError(null);
        };
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!form.identificacion || !form.firstName || !form.lastName ||
                !form.identificationType || !form.articleType ||
                !form.serial || !form.descripcion || !form.personType || !form.make) {
                setFormError('Todos los campos son obligatorios');
                return;
            }
            onSubmit({
                identification: form.identificacion,
                firstName: form.firstName,
                lastName: form.lastName,
                identificationType: form.identificationType.id,
                articleType: form.articleType.id,
                make: form.make.id,
                bond: form.personType.id,
                serial: form.serial,
                description: form.descripcion
            });
        };

        const maxDescripcion = 254;

        return (
            <>
                <div className={styles['form-title']}>Registro de dispositivos</div>
                {error && <div className={styles['error-message']}>{error}</div>}
                <form className={styles['form-container']} onSubmit={handleSubmit}>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="firstName">Nombres:</label>
                        <input
                            className={styles['form-field']}
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="lastName">Apellidos:</label>
                        <input
                            className={styles['form-field']}
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']}>Tipo identificación:</label>
                        <select
                            className={styles['form-field']}
                            id="identificationType"
                            name="identificationType"
                            value={form.identificationType?.id || ''}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value={''}>Seleccione...</option>
                            {identificationTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="identificacion">Identificación:</label>
                        <input
                            className={styles['form-field']}
                            type="text"
                            id="identificacion"
                            name="identificacion"
                            value={form.identificacion}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="personType">Vínculo:</label>
                        <select
                            className={styles['form-field']}
                            id="personType"
                            name="personType"
                            value={form.personType?.id || ''}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value={''}>Seleccione...</option>
                            {personTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="articleType">Tipo de Artículo:</label>
                        <select
                            className={styles['form-field']}
                            id="articleType"
                            name="articleType"
                            value={form.articleType?.id || ''}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value={''}>Seleccione...</option>
                            {articleTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="make">Marca:</label>
                        <select
                            className={styles['form-field']}
                            id="make"
                            name="make"
                            value={form.make?.id || ''}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="">Seleccione...</option>
                            {makes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="serial">Serial:</label>
                        <input
                            className={styles['form-field']}
                            type="text"
                            id="serial"
                            name="serial"
                            value={form.serial}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles['form-row']}>
                        <label className={styles['form-label']} htmlFor="descripcion">Descripcion:</label>
                        <textarea
                            className={styles['form-field']}
                            id="descripcion"
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            disabled={loading}
                            rows={2}
                            maxLength={maxDescripcion}
                        />
                    </div>
                    <div style={{fontSize: '0.9em', marginBottom: 8}}>254 Máximo de caracteres.</div>
                    {formError && <div className={styles.error}>{formError}</div>}
                    <div className={styles['button-row']}>
                        <button type="button" onClick={() => setForm({
                            identificacion: '',
                            firstName: '',
                            lastName: '',
                            identificationType: null,
                            articleType: null,
                            make: null,
                            personType: null,
                            serial: '',
                            descripcion: ''
                        })}>
                            <span role="img" aria-label="Limpiar">🧹</span> Limpiar
                        </button>
                        <button type="button" onClick={() => alert('Buscar no implementado')}>
                            <span role="img" aria-label="Buscar">🔍</span> Buscar
                        </button>
                        <button type="submit" disabled={loading}>
                            <span role="img" aria-label="Guardar">💾</span> Guardar
                        </button>
                    </div>
                </form>
            </>
        );
    };
