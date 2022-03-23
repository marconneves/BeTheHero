import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link';
import BounceLoader from "react-spinners/BounceLoader";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';

import styles from '../styles/Home.module.scss'

import { FiLogIn } from 'react-icons/fi';

import api from '../services/api';

interface FormData {
    id: string;
}

const schema = yup.object({
    id: yup.string().required('O id é obrigatório'),
  }).required();

export default function Home() {
    const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm({
        resolver: yupResolver(schema)
    })
    const router = useRouter();

    async function handleLogin({id}: FormData){
        try{
            const response = await api.post('session', { id });
            
            localStorage.setItem('@BeTheHero:ongId', id);
            localStorage.setItem('@BeTheHero:ongName', response.data.name)
            
            router.push('/profile')
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

                    <form onSubmit={handleSubmit(handleLogin)}>
                        <h1>Faça seu logon</h1>

                        <input 
                            placeholder="Seu ID"
                            className={errors.id ? 'error' : ''}
                            {...register('id')}
                        />
                        <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? <BounceLoader color="#FFF" size={20} /> : "Entrar" }</button>


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