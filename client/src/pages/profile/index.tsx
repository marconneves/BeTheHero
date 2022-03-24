import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import styles from './Profile.module.scss';


export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const [ongName, setOngName] = useState('');
    const [ongId, setOngId] = useState('');
    const routes = useRouter();

    useEffect(() => {
        const orgIdStorage = localStorage.getItem('@BeTheHero:ongId');

        setOngName(localStorage.getItem('@BeTheHero:ongName') || '');
        setOngId(orgIdStorage || '');

        if(!orgIdStorage){
            routes.push('/');
        }
    }, [])

    useEffect(() => {
        if(!ongId){
            return;
        }

        api.get('profile', {
            headers: {
                'x-api-key': ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    'x-api-key': ongId
                }
            })

            setIncidents(incidents.filter((incident) => incident.id !== id))
        } catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        routes.push('/');
    }

    return (
        <div className={styles.profile_container}>
            <header>
                <img src="/logo.svg" alt="BeTheHero" />
                <span>Bem vinda, {ongName}</span>

                <Link href="/incident/new">
                    <a href="/incident/new" className="button" >
                        Cadastrar novo caso
                    </a>
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident =>  (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                    ))}
            </ul>
        </div>
    )
}