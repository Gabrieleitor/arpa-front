import React, { useState } from 'react';
import type { IdentificationType } from '../../domain/entities/IdentificationType';
import type { User } from '../../domain/entities/User';

interface UserFormProps {
  identificationTypes: IdentificationType[];
  onSubmit: (user: User) => void;
  loading: boolean;
  error: string | null;
}

interface FormState {
  firstName: string;
  lastName: string;
  identificationType: number;
}

export const UserForm: React.FC<UserFormProps> = ({ identificationTypes, onSubmit, loading, error }) => {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    identificationType: 0,
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'identificationType' ? Number(value) : value,
    });
    setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.identificationType) {
      setFormError('Todos los campos son obligatorios');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">Nombres</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="lastName">Apellidos</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="identificationType">Tipo de identificación</label>
        <select
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
      {formError && <div style={{ color: 'red' }}>{formError}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={loading}>Enviar</button>
    </form>
  );
};
