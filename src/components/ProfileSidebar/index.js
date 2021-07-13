import { AlurakutProfileSidebarMenuDefault } from "../../lib/AlurakutCommons";
import Box from "../Box";

export default function ProfileSidebar(props) {
  
    return (
      <Box as='aside'>
        {props.githubUser === undefined ? 
        <img style={{ borderRadius: '8px' }} src={`https://i.stack.imgur.com/34AD2.jpg`} />
        : <img style={{ borderRadius: '8px' }} src={`https://github.com/${props.githubUser}.png`} /> }
  
        <hr />
  
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
        <hr />
  
        <AlurakutProfileSidebarMenuDefault />
      </Box>
    );
  }