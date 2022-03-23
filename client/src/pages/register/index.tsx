import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';
import BounceLoader from "react-spinners/BounceLoader";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import api from '../../services/api';

import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';

interface FormData {
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
}

const schema = yup.object({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    whatsapp: yup.string().required('O whatsapp é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
    uf: yup.string().required('O estado é obrigatório'),
  }).required();

export default function Register(){
    const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const router = useRouter();

    async function handleRegister(event: FormData) {

        try {
            const response = await api.post('/ongs', event);
            alert(`Seu ID de acesso: ${response.data.id}`);
            router.push('/');
        } catch (err){
            console.log(err)
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

                    <form onSubmit={handleSubmit(handleRegister)}>
                        <input
                            placeholder="Nome da ONG"
                            className={errors.name ? 'error' : ''}
                            {...register('name')}
                        />
                        <input 
                            type="email" placeholder="E-mail"
                            className={errors.email ? 'error' : ''}
                            {...register('email')}
                        />
                        <input 
                            placeholder="WhatsApp"
                            className={errors.whatsapp ? 'error' : ''}
                            {...register('whatsapp')}
                        />

                        <div className={styles.input_group}>
                            <input 
                                placeholder="Cidade"
                                className={errors.city ? 'error' : ''}
                                {...register('city')}
                            />
                            <input 
                                placeholder="UF" style={{width: 80 }}
                                className={errors.uf ? 'error' : ''}
                                {...register('uf')}
                            />
                        </div>

                        <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? <BounceLoader color="#FFF" size={20} /> : "Cadastrar" }</button>
                    </form>
                </div>
            </div>
        </>
    )
}