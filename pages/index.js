import { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import Box from '../src/components/Box'
import LoadingBox from '../src/components/LoadingBox'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelations, ProfileRelationsBoxWrapper, getFollowers, getCommunities, getScraps } from '../src/components/ProfileRelations'
import ProfileSidebar from '../src/components/ProfileSidebar'
import Scrap from '../src/components/Scrap'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ComunidadeForm from '../src/forms/ComunidadeForm'
import ScrapForm from '../src/forms/ScrapForm'

export default function Home(props) {

  const [followersInfo, setFollowersInfo] = useState({});
  const [comunidades, setComunidades] = useState({comunidades: [], total: 0 });
  const [scraps, setScraps] = useState({scraps: [], total: 0 });
  const [isReloadCommunity, setReloadCommunity] = useState(true);
  const [isReloadScrap, setReloadScrap] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [acao, setAcao] = useState('comunidades');
  const { githubUser } = props;

  const pessoasComunidade = [
    {
      id: 123,
      title: 'juunegreiros',
      image: `https://github.com/juunegreiros.png`,
      urlRef: `https://github.com/juunegreiros`
    },
    {
      id: 124,
      title: 'omariosouto',
      image: `https://github.com/omariosouto.png`,
      urlRef: `https://github.com/omariosouto`
    },
    {
      id: 125,
      title: 'peas',
      image: `https://github.com/peas.png`,
      urlRef: `https://github.com/peas`
    }
  ]

  useEffect(async () => {
    getFollowers(githubUser).then((response) => {
      setLoading(false);
      if (response === undefined) {
        setFollowersInfo([]);
      } else {
        setFollowersInfo(response);
      }
    });
  }, []);

  useEffect(async () => {
    setLoading(true);
    getCommunities({githubUser}).then((response) => {
      setLoading(false);
      if (response === undefined) {
        setComunidades([]);
      } else {
        setComunidades(response);
      }
      setReloadCommunity(false);
    });
  }, [isReloadCommunity === true]);

  useEffect(async () => {
    setLoading(true);
    getScraps({githubUser}).then((response) => {
      setLoading(false);
      if (response === undefined) {
        setScraps([]);
      } else {
        setScraps(response);
      }
      setReloadScrap(false);
    });
  }, [isReloadScrap === true]);

  return (
    <>
      <LoadingBox isLoading={isLoading}/>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>

        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet recados={scraps.total} confiavel={3} legal={2} sexy={0} fotos={1} fas={followersInfo.quantidade} />
            <text style={{fontSize: 14, fontFamily: 'sans-serif'}}>
              <br/>
              <b>Sorte de hoje: </b> Evite tomar decis??es precipitadas.
            </text>
          </Box>
          <Box>
            <h2 className="subTitle">
              O que voc?? deseja fazer?
            </h2>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <button onClick={() => {
                setAcao('comunidades');
                setReloadCommunity(true);
              }}>
                Comunidades
              </button>
              <button onClick={() => {
                setAcao('scraps');
                setReloadScrap(true);
              }}>
                Scraps
              </button>
            </div>
            <br />
            { acao === 'comunidades' ?
              <ComunidadeForm comunidades={comunidades} setReloadCommunity={setReloadCommunity} setLoading={setLoading} githubUser={githubUser}/>
              :
              <ScrapForm
                mainGithubUser={githubUser}
                githubUser={githubUser}
                setLoading={(flag) => setLoading(flag)}
                setReloadScrap={(flag) => setReloadScrap(flag)}
              />
            }
          </Box>
          { acao === 'scraps' &&
            <Box>
              {scraps.total > 0 ? 
                scraps.scraps.map((it) => <Scrap scrap={it} />)
              : 
              <div style={{textAlign: 'center', backgroundColor: '#f8ffc2', padding: 14, borderRadius: 5, fontFamily: 'sans-serif', fontSize: 14}}>
                Sem recados para serem mostrados.
                <img src='https://http.cat/404'/>
              </div>
              }
            </Box>
          }
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Amigos' href='/friends' quantidade={followersInfo.quantidade} lista={followersInfo.followersToShow}/>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Pessoas da comunidade' href='/friends' quantidade={pessoasComunidade.length} lista={pessoasComunidade}/>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Comunidades' href='/communities' quantidade={comunidades.total} lista={comunidades.comunidades}/>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  if (!token || !cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  }).then((response) => response.json())

  const decodedToken = jwt.decode(token);
  const { githubUser } = decodedToken;
  if (!isAuthenticated) {
  
    const resultado = await fetch(
      `https://api.github.com/users/${githubUser}`,
      {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
      }
    )
  
    if (!resultado.ok) {
      nookies.destroy(context, 'USER_TOKEN')
      return {
        redirect: {
          destination: '/login?error=true',
          permanent: false,
        },
      }
    }
  }

  return {
    props: {
      githubUser
    }
  }

}