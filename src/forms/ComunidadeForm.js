import { pushCommunity } from "../../src/components/ProfileRelations";

export default function ComunidadeForm(props) {

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.setLoading(true);
                const dados = new FormData(e.target)
                var imagem = dados.get('image');
                if (dados.get('title') === undefined || dados.get('title') === '') {
                alert('É necessário colocar um título para a comunidade.');
                return;
                }
                if (imagem === undefined || imagem === '') {
                    const idAleatorio = Math.random();
                    imagem = `https://picsum.photos/200/300?${idAleatorio}`;
                }
                if (dados.get('urlRef') === undefined || dados.get('urlRef') === '') {
                alert('É necessário colocar uma URL de referência para a comunidade.');
                return;
                }

                const comunidade = {
                    title: dados.get('title'),
                    image: imagem,
                    urlRef: dados.get('urlRef')
                };

                pushCommunity(comunidade).then(() => {
                    props.setReloadCommunity(true);
                });
            }}>
                <div>
                <input
                    placeholder="Qual vai ser o nome da sua comunidade?"
                    name="title"
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="text"
                />
                </div>
                <div>
                <input
                    placeholder="URL para capa (Deixe vazio para uma imagem aleatória)"
                    name="image"
                    aria-label="URL para capa (Deixe vazio para uma imagem aleatória)"
                />
                </div>
                <div>
                <input
                    placeholder="URL de referência para a comunidade"
                    name="urlRef"
                    aria-label="URL de referência para a comunidade"
                />
                </div>
                <button type='submit'>
                    Criar comunidade
                </button>
            </form>
        </div>
    )
}