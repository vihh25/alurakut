import styled from "styled-components";
import Box from "../Box";

const ScrapBox = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    background: '#333';
    img {
        width: 100px;
        border-radius: 8px;
    }
`;

export default function Scrap(props) {
    const scrap = props.scrap;
    const data = new Date(scrap.dateTime);
    return(
        <ScrapBox>
            <div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#aabb9788', borderRadius: 5, padding: 10}}>
                    <img src={scrap.imageUrl} />
                    <div style={{display: 'flex', flexDirection: 'column', paddingLeft: 10, width: '100%'}}>
                        <a href={`https://github.com/${scrap.user}`}>
                            {scrap.user}
                        </a>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', fontSize: 13, paddingTop: 7}}>
                            <div>
                            {/* Um dia irás realizar o que sonhastes, se sentir-se realizado e sem maiores perspectivas, talvez seja melhor não alcançá-lo. */}
                                {scrap.message}
                            </div>
                            <div style={{ maxWidth: 50, marginLeft: 10, marginRight: 3}}>
                                {`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrapBox>
    );
}