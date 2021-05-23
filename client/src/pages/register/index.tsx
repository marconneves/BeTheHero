import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import styles from './Register.module.scss';

export default function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [city, setCity] = useState("");
    const [uf, setUf] = useState("");

    const router = useRouter();

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        const data = (
            {name, email, whatsapp, city, uf}
        )

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            router.push('/');
        } catch (err){
            alert('Erro no cadastro, tente novamente.')
        }
    }
    return (
        <>
            <Head>
                <title>Criar Conta - BeTheHero</title>
            </Head>
            <div className={styles.register_container}>
                <div className={styles.content}>
                    <section>
                        <img src="/logo.svg" alt="Be The Hero" />
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                        <Link href="/">
                            <a href="/register" className="back_link">
                                <FiArrowLeft size={16} color="#e02041"/>
                                Volar
                            </a>
                        </Link>

                    </section>

                    <form onSubmit={handleRegister}>
                        <input
                            placeholder="Nome da ONG"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input 
                            type="email" placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input 
                            placeholder="WhatsApp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                        />

                        <div className={styles.input_group}>
                            <input 
                                placeholder="Cidade"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                            <input 
                                placeholder="UF" style={{width: 80 }}
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            />
                        </div>

                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}