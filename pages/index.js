import { useEffect, useState, useRef } from 'react'
import Box from '../src/components/Box'
import LoadingBox from '../src/components/LoadingBox'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelations, ProfileRelationsBoxWrapper, getFollowers } from '../src/components/ProfileRelations'
import { getCommunities } from '../src/components/ProfileRelations/actions'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ComunidadeForm from './ComunidadeForm'

export default function Home() {

  const [followersInfo, setFollowersInfo] = useState({});
  const [comunidades, setComunidades] = useState({comunidades: [], total: 0 });
  const [isReloadCommunity, setReloadCommunity] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const githubUser = 'vihh25';

  const pessoasComunidade = [
    {
      title: 'juunegreiros',
      image: `https://github.com/juunegreiros.png`,
      urlRef: `https://github.com/juunegreiros`
    },
    {
      title: 'omariosouto',
      image: `https://github.com/omariosouto.png`,
      urlRef: `https://github.com/omariosouto`
    },
    {
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
    getCommunities().then((response) => {
      setLoading(false);
      if (response === undefined) {
        setComunidades([]);
      } else {
        setComunidades(response);
      }
      setReloadCommunity(false);
    });
  }, [isReloadCommunity === true]);

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
            <OrkutNostalgicIconSet />
            <text style={{fontSize: 14, fontFamily: 'sans-serif'}}>
              <br/>
              <b>Sorte de hoje: </b> Evite tomar decisões precipitadas.
            </text>
          </Box>
          <ComunidadeForm comunidades={comunidades} setReloadCommunity={setReloadCommunity} setLoading={setLoading}/>
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
