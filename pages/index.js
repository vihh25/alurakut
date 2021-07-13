import { useEffect, useState } from 'react'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { getFollowers } from '../src/components/ProfileRelations/actions'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
  
  return (
    <Box>
      {props.githubUser === undefined ? 
      <img style={{ borderRadius: '8px' }} src={`https://i.stack.imgur.com/34AD2.jpg`} />
      : <img style={{ borderRadius: '8px' }} src={`https://github.com/${props.githubUser}.png`} /> }
    </Box>
  );
}

export default function Home() {

  const [followersInfo, setFollowersInfo] = useState({});
  
  const githubUser = 'vihh25';

  // Lista de usuários do github utilizados como exemplo: ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']

  useEffect(async () => {
    setFollowersInfo(await getFollowers(githubUser));
  }, []);

  return (
    <>
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
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade  
              <a style={{paddingLeft: 4, fontWeight: '700', color: '#2E7BB4'}} href={'/friends'}>
                ({followersInfo.followersNumber})
              </a>
            </h2>
              <ul>
                {followersInfo && followersInfo.followersToShow && followersInfo.followersToShow.length > 0 && followersInfo.followersToShow.map(it => {
                  return (
                    <div key={it.username} style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                      <li>
                          <a href={`/users/${it.username}`} key={it.username}>
                            <img src={`https://github.com/${it.username}.png`} />
                          </a>
                      </li>
                      <a href={`/users/${it.username}`} key={it.username}>
                        <span style={{wordBreak: 'break-word', color: '#2E7BB4', fontWeight: '400'}}>{it.username} ({it.followers})</span>
                      </a>
                    </div>
                  )
                })}
              </ul>
          </ProfileRelationsBoxWrapper>
          {/* <Box>
            Comunidades
          </Box> */}
        </div>

      </MainGrid>
    </>
  )
}
