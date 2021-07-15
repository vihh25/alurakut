import { pushScrap } from "../components/ProfileRelations";

export default function ScrapForm(props) {

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.setLoading(true);
                const dados = new FormData(e.target)
                var imagem = dados.get('imageUrl');
                if (dados.get('user') === undefined || dados.get('user') === '') {
                alert('É necessário colocar um título para a comunidade.');
                return;
                }
                if (imagem === undefined || imagem === '') {
                    const idAleatorio = Math.random();
                    imagem = `https://picsum.photos/200/300?${idAleatorio}`;
                }
                if (dados.get('message') === undefined || dados.get('message') === '') {
                alert('É necessário colocar uma mensagem para ser enviada.');
                return;
                }

                const scrap = {
                    user: dados.get('user'),
                    imageUrl: `https://github.com/${dados.get('user')}.png`,
                    message: dados.get('message'),
                    dateTime: new Date()
                };

                pushScrap(scrap).then(() => {
                    props.setReloadScrap(true);
                });
            }}>
                <div>
                    <input
                        placeholder="Nome do usuário"
                        name="user"
                        aria-label="Nome do usuário"
                    />
                </div>
                <div>
                    <textarea
                        aria-multiline='true'
                        placeholder="Digite aqui o texto"
                        name="message"
                        aria-label="Digite aqui o texto"
                        type="text"
                    />
                </div>
                <button type='submit'>
                    Enviar recado
                </button>
            </form>
        </div>
    )
}