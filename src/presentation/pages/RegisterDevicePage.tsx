import React, {useMemo} from 'react';
import {RegisterDeviceForm} from '../components/RegisterDeviceForm';
import {useIdentificationTypes} from '../hooks/useIdentificationTypes';
import {IdentificationTypeRepositoryImpl} from '../../infrastructure/repositories/IdentificationTypeRepositoryImpl';
import {GetIdentificationTypesUseCase} from '../../domain/use-cases/GetIdentificationTypesUseCase';
import {IdentificationTypeService} from '../../application/services/IdentificationTypeService';
import type {Device} from '../../domain/entities/Device';
import styles from '../components/RegisterDeviceForm.module.css';
import banner from '../../assets/banner.jpg';

export const RegisterDevicePage: React.FC = () => {
    // Inyección de dependencias usando useMemo para evitar recreaciones
    const identificationTypeRepository = useMemo(() => new IdentificationTypeRepositoryImpl(), []);
    const getIdentificationTypesUseCase = useMemo(() => new GetIdentificationTypesUseCase(identificationTypeRepository), [identificationTypeRepository]);
    const identificationTypeService = useMemo(() => new IdentificationTypeService(getIdentificationTypesUseCase), [getIdentificationTypesUseCase]);

    const {identificationTypes, loading, error} = useIdentificationTypes(identificationTypeService);

    const handleSubmit = (device: Device) => {
        // Aquí podrías enviar el dispositivo a una API, mostrar un mensaje, etc.
        alert(`Dispositivo enviado: ${JSON.stringify(device, null, 2)}`);
    };

    return (
        <>
            <div className={styles['banner-wrapper']}>
                <img src={banner} alt="Banner" className={styles.banner}/>
            </div>
            <div>
                <RegisterDeviceForm
                    identificationTypes={identificationTypes}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
};
