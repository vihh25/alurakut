import React, { useState } from 'react';
import nookies from 'nookies';
import { useRouter } from 'next/router';

export default function LoginScreen(props) {

    const [githubUser, setGithubUser] = useState('');
    const [isTouched, setTouched] = useState(false);

    const router = useRouter();

    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div className="loginScreen">
            <section className="logoArea">
            <img src="https://alurakut.vercel.app/logo.svg" />

            <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
            <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
            <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
            </section>

            <section className="formArea">
            <form 
                className="box"
                onSubmit={(e) => {
                    e.preventDefault();

                    let githubUserAux = githubUser;

                    if (githubUserAux.trim().toLowerCase() === '@vihh25' || githubUserAux.trim().toLowerCase() === '@natcardozo') {
                        githubUserAux = githubUserAux.replace('@', '');
                    }

                    if (githubUserAux === '') {
                        return;
                    }

                    fetch('https://alurakut.vercel.app/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ githubUser: githubUserAux })
                    }).then(async (response) => {
                        const token = await response.json();
                        nookies.set(null, 'USER_TOKEN', token.token, {
                            path: '/',
                            maxAge: 86400 * 7
                        })
                        router.push('/');
                    })

                }}
            >
                <p>
                Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
                <input 
                    onBlur={(e) => setTouched(true)}
                    placeholder="Usuário"
                    style={
                        {
                            backgroundColor: '#dadada',
                            color: '#333333'
                        }
                    }
                    value={githubUser}
                    onChange={(e) => {
                        setGithubUser(e.target.value);
                        if (!isTouched) {
                            setTouched(true);
                        }
                    }}
                />
                <div style={{color: 'red', fontFamily: 'sans-serif', fontSize: 12}}>
                    <div>
                        {
                            props.error && 'Não foi possível efetuar o login. Tente novamente mais tarde'
                        }
                    </div>
                    {
                        githubUser.length === 0 && isTouched ? 'Digite o nome do seu usuário' : githubUser.trim().toLowerCase() === 'vihh25' || githubUser.trim().toLowerCase() === 'natcardozo' ? 'O que você está tentando insinuar?' : ''
                    }
                </div>
                <br />
                <button 
                    type="submit"
                >
                Login
            </button>
            </form>

            <footer className="box">
                <p>
                Ainda não é membro? <br />
                <a href="/login">
                    <strong>
                    ENTRAR JÁ
                </strong>
                </a>
                </p>
            </footer>
            </section>

            <footer className="footerArea">
            <p>
                © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
            </p>
            </footer>
        </div>
        </main>
    )
} 

export async function getServerSideProps(context) {

    nookies.destroy(context, 'URL_TOKEN');

    return {
        props: {
            githubUser: '',
            error: (context.query.error != undefined && context.query.error === 'true')
        }
    };
}