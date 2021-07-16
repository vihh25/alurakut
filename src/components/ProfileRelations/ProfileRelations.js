import { useRouter } from 'next/router';

export function ProfileRelations(props) {

    const router = useRouter();

    const lista = props.lista && props.lista.slice(0, 9);

    return (
        <>
            <h2 className="smallTitle">
                {props.title}
                <a className="boxLink" style={{paddingLeft: '4px'}} href={props.href}>
                    ({props.quantidade ? props.quantidade : 0})
                </a>
            </h2>
                <ul>
                {props && props.quantidade > 0 && lista.map(it => {
                    return (
                    <div key={it.id} style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                        <li>
                            {
                                props.title === 'Amigos' ? 
                                    <a className='boxLink' onClick={(e) => {
                                        e.preventDefault();
                                        router.push(`/users/${it.id}`)
                                    }}>
                                        <img src={it.image} />
                                    </a>
                                :
                                    <a className='boxLink' href={it.urlRef}>
                                        <img src={it.image} />
                                    </a>
                            }
                        </li>
                        <a className='boxLink' href={it.urlRef}>
                            <span style={{wordBreak: 'break-word', color: '#2E7BB4', fontWeight: '400'}}>{it.title}</span>
                        </a>
                    </div>
                    )
                })}
            </ul>
        </>
    )
}