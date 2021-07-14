import { useEffect, useState, useRef } from 'react'
import Box from '../src/components/Box'
import LoadingBox from '../src/components/LoadingBox'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelations, ProfileRelationsBoxWrapper, getFollowers } from '../src/components/ProfileRelations'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ComunidadeForm from './ComunidadeForm'

const comunidadesDefault = [
  {
    id: 123,
    title: 'The Paper Kites',
    image: 'https://i1.sndcdn.com/avatars-000212503053-fmz4a9-t240x240.jpg',
    urlRef: 'https://open.spotify.com/artist/79hrYiudVcFyyxyJW0ipTy'
  },
  {
    id: 124,
    title: 'Só mais 5 minutinhos',
    image: 'https://img10.orkut.br.com/community/02a28e50242e7904b5271c2652862af3.jpg',
    urlRef: 'https://youtu.be/q76bMs-NwRk'
  },
  {
    id: 125,
    title: 'Disk MTV Anos 2000',
    image: 'https://upload.wikimedia.org/wikipedia/pt/e/e6/Disk_MTV_logo.jpg',
    urlRef: 'https://open.spotify.com/playlist/27L9YuAbvWv2N5hJJFS81j?si=c55cdccb5aea4cc4'
  },
]

export default function Home() {

  const [followersInfo, setFollowersInfo] = useState({});
  const [comunidades, setComunidades] = useState(comunidadesDefault);
  const isLoading = useRef(false);
  const githubUser = 'vihh25';

  // Lista de usuários do github utilizados como exemplo: ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']

  useEffect(async () => {
    isLoading.current = true;
    getFollowers(githubUser).then((response) => {
      isLoading.current = false;
      if (response === undefined) {
        setFollowersInfo([]);
      } else {
        setFollowersInfo(response);
      }      
    });
  }, []);

  return (
    <>
      <LoadingBox isLoading={isLoading.current}/>
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
          <ComunidadeForm comunidades={comunidades} setComunidades={setComunidades}/>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Pessoas da comunidade' href='/friends' quantidade={followersInfo.quantidade} lista={followersInfo.followersToShow}/>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ProfileRelations title='Comunidades' href='/communities' quantidade={comunidades.length} lista={comunidades}/>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
