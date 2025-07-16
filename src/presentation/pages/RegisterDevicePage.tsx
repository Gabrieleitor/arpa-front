import React, {useMemo} from 'react';
import {RegisterDeviceForm} from '../components/RegisterDeviceForm';
import {useIdentificationTypes} from '../hooks/useIdentificationTypes';
import {useArticleTypes} from '../hooks/useArticleTypes';
import {IdentificationTypeRepositoryImpl} from '../../infrastructure/repositories/IdentificationTypeRepositoryImpl';
import {GetIdentificationTypesUseCase} from '../../domain/use-cases/GetIdentificationTypesUseCase';
import {IdentificationTypeService} from '../../application/services/IdentificationTypeService';
import {ArticleTypeService} from '../../application/services/ArticleTypeService';
import type {Device} from '../../domain/entities/Device';
import styles from '../components/RegisterDeviceForm.module.css';
import banner from '../../assets/banner.jpg';
import {GetArticleTypeUseCase} from "../../domain/use-cases/GetArticleTypeUseCase.ts";
import {ArticleTypeRepositoryImpl} from "../../infrastructure/repositories/ArticleTypeRepositoryImpl.ts";
import {PersonTypeRepositoryImpl} from "../../infrastructure/repositories/PersonTypeRepositoryImpl.ts";
import {MakeTypeRepositoryImpl} from "../../infrastructure/repositories/MakeRepositoryImpl.ts";
import {GetPersonTypeUseCase} from "../../domain/use-cases/GetPersontypeUseCase.ts";
import {GetMakeUseCase} from "../../domain/use-cases/GetMakeUseCase.ts";
import {PersonTypeService} from "../../application/services/PersonTypeService.ts";
import {MakeService} from "../../application/services/MakeService.ts";
import {usePersonTypes} from "../hooks/usePersonTypes.ts";
import {useMake} from "../hooks/useMake.ts";

export const RegisterDevicePage: React.FC = () => {
    // Inyección de dependencias usando useMemo para evitar recreaciones
    const identificationTypeRepository = useMemo(() => new IdentificationTypeRepositoryImpl(), []);
    const articleTypeRepository = useMemo(() => new ArticleTypeRepositoryImpl(), []);
    const personTypeRepository = useMemo(() => new PersonTypeRepositoryImpl(), []);
    const makeRepository = useMemo(() => new MakeTypeRepositoryImpl(), [])

    const getIdentificationTypesUseCase = useMemo(() => new GetIdentificationTypesUseCase(identificationTypeRepository), [identificationTypeRepository]);
    const getArticleTypesUseCase = useMemo(() => new GetArticleTypeUseCase(articleTypeRepository), [articleTypeRepository]);
    const getPersonTypeUseCase = useMemo(() => new GetPersonTypeUseCase(personTypeRepository), [personTypeRepository]);
    const getMakeUseCase = useMemo(() => new GetMakeUseCase(makeRepository), [makeRepository]);

    const identificationTypeService = useMemo(() => new IdentificationTypeService(getIdentificationTypesUseCase), [getIdentificationTypesUseCase]);
    const articleTypeService = useMemo(() => new ArticleTypeService(getArticleTypesUseCase), [getArticleTypesUseCase])
    const personTypeService = useMemo(() => new PersonTypeService(getPersonTypeUseCase), [getPersonTypeUseCase]);
    const makeService = useMemo(() => new MakeService(getMakeUseCase), [getMakeUseCase]);

    const {identificationTypes, identiLoading, identiError} = useIdentificationTypes(identificationTypeService);
    const {articleTypes, articleLoading, articleError} = useArticleTypes(articleTypeService);
    const {personTypes, personLoading, personError} = usePersonTypes(personTypeService);
    const {makes, makeLoading, makeError} = useMake(makeService);

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
                    articleTypes={articleTypes}
                    makes = {makes}
                    personTypes = {personTypes}
                    loading={identiLoading || articleLoading || personLoading || makeLoading}
                    error={identiError || articleError || personError || makeError}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
};
