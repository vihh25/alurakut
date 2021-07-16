import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import Box from '../../src/components/Box'
import LoadingBox from '../../src/components/LoadingBox'
import MainGrid from '../../src/components/MainGrid'
import { ProfileRelations, ProfileRelationsBoxWrapper, getFollowers, getCommunities, getScraps } from '../../src/components/ProfileRelations'
import ProfileSidebar from '../../src/components/ProfileSidebar'
import Scrap from '../../src/components/Scrap'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../../src/lib/AlurakutCommons'
import ScrapForm from '../../src/forms/ScrapForm'

export default function Users(props) {

  const [followersInfo, setFollowersInfo] = useState({});
  const [comunidades, setComunidades] = useState({comunidades: [], total: 0 });
  const [scraps, setScraps] = useState({scraps: [], total: 0 });
  const [isReloadScrap, setReloadScrap] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { mainGithubUser } = props;
  const router = useRouter();

  const query = router.query;
  const githubUser = query.id;

  useEffect(async () => {
    getFollowers(githubUser).then((response) => {
      setLoading(false);
      if (response === undefined) {
        setFollowersInfo([]);
      } else {
        setFollowersInfo(response);
      }
    });
  }, [githubUser]);

  useEffect(async () => {
    setLoading(true);
    getCommunities({githubUser: githubUser}).then((response) => {
      setLoading(false);
      if (response === undefined) {
        setComunidades([]);
      } else {
        setComunidades(response);
      }
    });
  }, [githubUser]);

  useEffect(async () => {
    setLoading(true);
    getScraps({githubUser: githubUser}).then((response) => {
      setLoading(false);
      if (response === undefined) {
        setScraps([]);
      } else {
        setScraps(response);
      }
      setReloadScrap(false);
    });
  }, [isReloadScrap === true || githubUser]);

  return (
    <>
      <LoadingBox isLoading={isLoading}/>
      <AlurakutMenu githubUser={mainGithubUser}/>
      <MainGrid>

        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
                <a className='boxLink' style={{fontSize: 28}} href={`https://github.com/${githubUser}`}>
                    @{githubUser}
                </a>
            </h1>
            <OrkutNostalgicIconSet recados={scraps.total} confiavel={3} legal={2} sexy={0} fotos={1} fas={followersInfo.quantidade} />
            <text style={{fontSize: 14, fontFamily: 'sans-serif'}}>
              <br/>
            </text>
          </Box>
          <Box>
            <h3 style={{color: '#333333', fontFamily: 'sans-serif'}}>
              Diga o que desejas
            </h3>
            <br />
            <ScrapForm
                mainGithubUser={mainGithubUser}
                githubUser={githubUser}
                setLoading={(flag) => setLoading(flag)}
                setReloadScrap={(flag) => setReloadScrap(flag)}
            />
          </Box>
        <Box>
            {scraps.total > 0 ? 
              scraps.scraps.map((it) => <Scrap key={it.id} scrap={it} />)
            : 
            <div style={{textAlign: 'center', backgroundColor: '#f8ffc2', padding: 14, borderRadius: 5, fontFamily: 'sans-serif', fontSize: 14}}>
              Sem recados para serem mostrados.
              <img src='https://http.cat/404'/>
            </div>
            }
        </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Amigos' href='/users' quantidade={followersInfo.quantidade} lista={followersInfo.followersToShow}/>
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

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const decodedToken = jwt.decode(token);
  const { githubUser } = decodedToken;

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

  return {
    props: {
      mainGithubUser: githubUser
    }
  }

}