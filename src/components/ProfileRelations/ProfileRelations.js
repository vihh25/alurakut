export function ProfileRelations(props) {

    const lista = props.lista && props.lista.slice(0, 9);

    return (
        <>
            <h2 className="smallTitle">
                {props.title}
                <a className="boxLink" style={{paddingLeft: '4px'}} href={props.href}>
                    ({props.quantidade})
                </a>
            </h2>
                <ul>
                {props && props.quantidade > 0 && lista.map(it => {
                    return (
                    <div key={it.id} style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                        <li>
                            <a href={it.urlRef}>
                                <img src={it.image} />
                            </a>
                        </li>
                        <a href={it.urlRef}>
                            <span style={{wordBreak: 'break-word', color: '#2E7BB4', fontWeight: '400'}}>{it.title}</span>
                        </a>
                    </div>
                    )
                })}
            </ul>
        </>
    )
}