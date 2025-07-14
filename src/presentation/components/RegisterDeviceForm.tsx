import React, {useState} from 'react';
import type {IdentificationType} from '../../domain/entities/IdentificationType';
import type {Device} from '../../domain/entities/Device';
import styles from './RegisterDeviceForm.module.css';

interface RegisterDeviceFormProps {
    identificationTypes: IdentificationType[];
    onSubmit: (device: Device) => void;
    loading: boolean;
    error: string | null;
}

interface FormState {
    identificacion: string;
    firstName: string;
    lastName: string;
    identificationType: number;
    tipoArticulo: string;
    marca: string;
    vinculo: string;
    serial: string;
    descripcion: string;
}

export const RegisterDeviceForm: React.FC<RegisterDeviceFormProps> = ({identificationTypes, onSubmit, loading, error}) => {
    const [form, setForm] = useState<FormState>({
        identificacion: '',
        firstName: '',
        lastName: '',
        identificationType: 0,
        tipoArticulo: '',
        marca: '',
        vinculo: '',
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
            [name]: name === 'identificationType' ? Number(value) : value,
        });
        setFormError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.identificacion || !form.firstName || !form.lastName || !form.identificationType || !form.serial || !form.descripcion) {
            setFormError('Todos los campos son obligatorios');
            return;
        }
        onSubmit(form);
    };

    // Opciones de ejemplo para selects
    const tipoArticuloOptions = [
        {value: '', label: 'Seleccione...'},
        {value: 'ARTICULO DE PRUEBAS', label: 'ARTICULO DE PRUEBAS'},
    ];
    const marcaOptions = [
        {value: '', label: 'Seleccione...'},
        {value: 'ACER', label: 'ACER'},
    ];
    const vinculoOptions = [
        {value: '', label: 'Seleccione...'},
        {value: 'EAAB', label: 'EAAB'},
    ];
    const maxDescripcion = 254;

    return (
        <>
            <div className={styles['form-title']}>Registro de dispositivos</div>
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
                        value={form.identificationType}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        <option value={0}>Seleccione...</option>
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
                    <label className={styles['form-label']} htmlFor="vinculo">Vínculo:</label>
                    <select
                        className={styles['form-field']}
                        id="vinculo"
                        name="vinculo"
                        value={form.vinculo}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        {vinculoOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles['form-row']}>
                    <label className={styles['form-label']} htmlFor="tipoArticulo">Tipo artículo:</label>
                    <select
                        className={styles['form-field']}
                        id="tipoArticulo"
                        name="tipoArticulo"
                        value={form.tipoArticulo}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        {tipoArticuloOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles['form-row']}>
                    <label className={styles['form-label']} htmlFor="marca">Marca:</label>
                    <select
                        className={styles['form-field']}
                        id="marca"
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        disabled={loading}
                    >
                        {marcaOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
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
                        identificationType: 0,
                        tipoArticulo: '',
                        marca: '',
                        vinculo: '',
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
                {error && <div className={styles.error}>{error}</div>}
            </form>
        </>
    );
};
