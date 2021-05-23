import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link';

import styles from '../styles/Home.module.scss'

import { FiLogIn } from 'react-icons/fi';

import api from '../services/api';
import { FormEvent, useState } from 'react';

export default function Home() {
    const [id, setId] = useState("");

    const router = useRouter();

    async function handleLogin(event: FormEvent){
        event.preventDefault();

        try{
            const response = await api.post('session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name)
            
            router.push('/perfil')
        } catch(err){
            alert('Falha no login, tente novamente.');
        }
    }
    return (
        <>
            <Head>
                <title>BeTheHero</title>
            </Head>
            <div className={styles.logon_container}>
                <section className={styles.form}>
                    <img src="/logo.svg" alt="Be The Hero" />

                    <form onSubmit={handleLogin}>
                        <h1>Faça seu logon</h1>

                        <input 
                            placeholder="Seu ID"
                            value={id}
                            onChange={e => setId(e.target.value)}    
                        />
                        <button className="button" type="submit">Entrar</button>


                        <Link href="/register">
                            <a href="/register" className="back_link">
                                <FiLogIn size={16} color="#e02041"/>
                                Não tenho cadastro
                            </a>
                        </Link>
                    </form>
                </section>

                <img src="/heroes.png" alt="heroes" />
            </div>
        </>
    )
}