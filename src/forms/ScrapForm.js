import { pushScrap } from "../components/ProfileRelations";

export default function ScrapForm(props) {

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.setLoading(true);
                const dados = new FormData(e.target)

                if (dados.get('message') === undefined || dados.get('message') === '') {
                    alert('É necessário colocar uma mensagem para ser enviada.');
                    return;
                }

                const scrap = {
                    user: props.mainGithubUser,
                    targetUser: props.githubUser,
                    imageUrl: `https://github.com/${props.mainGithubUser}.png`,
                    message: dados.get('message'),
                    dateTime: new Date()
                };

                pushScrap(scrap).then(() => {
                    props.setReloadScrap(true);
                });
            }}>
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