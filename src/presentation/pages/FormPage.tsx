import React, {useMemo} from 'react';
import {UserForm} from '../components/UserForm';
import {useIdentificationTypes} from '../hooks/useIdentificationTypes';
import {IdentificationTypeRepositoryImpl} from '../../infrastructure/repositories/IdentificationTypeRepositoryImpl';
import {GetIdentificationTypesUseCase} from '../../domain/use-cases/GetIdentificationTypesUseCase';
import {IdentificationTypeService} from '../../application/services/IdentificationTypeService';
import type {User} from '../../domain/entities/User';
import styles from '../components/UserForm.module.css';
import banner from '../../assets/banner.jpg';

export const FormPage: React.FC = () => {
    // Inyección de dependencias usando useMemo para evitar recreaciones
    const identificationTypeRepository = useMemo(() => new IdentificationTypeRepositoryImpl(), []);
    const getIdentificationTypesUseCase = useMemo(() => new GetIdentificationTypesUseCase(identificationTypeRepository), [identificationTypeRepository]);
    const identificationTypeService = useMemo(() => new IdentificationTypeService(getIdentificationTypesUseCase), [getIdentificationTypesUseCase]);

    const {identificationTypes, loading, error} = useIdentificationTypes(identificationTypeService);

    const handleSubmit = (user: User) => {
        // Aquí podrías enviar el usuario a una API, mostrar un mensaje, etc.
        alert(`Usuario enviado: ${JSON.stringify(user, null, 2)}`);
    };

    return (
        <>
            <div className={styles['banner-wrapper']}>
                <img src={banner} alt="Banner" className={styles.banner}/>
            </div>
            <div>
                <UserForm
                    identificationTypes={identificationTypes}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmit}
                />
            </div>
        </>

    );
};
