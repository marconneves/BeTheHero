import React, {FormEvent, useEffect, useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import styles from './NewIncident.module.scss';

export default function NewIncident() {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');

    const [ ongId, setOngId ] = useState('');

    const routes = useRouter();

    useEffect(() => {
        setOngId(localStorage.getItem('ongId') || '');

        if(!ongId){
            routes.push('/');
        }
    }, []);

    async function handleNewIncident(event: FormEvent){
        event.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            routes.push('/profile');
        } catch(err){
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className={styles.new_incident_container}>
            <div className={styles.content}>
                <section>
                    <img src='/logo.svg' alt="Be The Hero" />
                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link href="/profile" >
                        <a href="/profile" className="back_link">
                            <FiArrowLeft size={16} color="#e02041"/>
                            Volar para home
                        </a>
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}