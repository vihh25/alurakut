import Box from "../src/components/Box";

export default function ComunidadeForm(props) {

    const comunidades = props.comunidades;

    return (
        <Box>
            <h2 className="subTitle">
                O que você deseja fazer?
            </h2>
            <form onSubmit={(e) => {
                e.preventDefault();
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

                props.setComunidades([...comunidades, {
                    title: dados.get('title'),
                    image: imagem,
                    urlRef: dados.get('urlRef'),
                    id: new Date().toISOString()
                }]);
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
        </Box>
    )
}