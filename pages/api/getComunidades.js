export default async function getCommunities (request, response) {

    if (request.method === 'GET') {
        const resultado = await fetch(
            'https://graphql.datocms.com?query={allCommunities(first: 9, orderBy: [_firstPublishedAt_ASC], filter: {creatorSlug: {eq: ' + request.query.githubUser + '}}) {id, title, imageUrl, referenceUrl, _status, _firstPublishedAt}, _allCommunitiesMeta (filter: {creatorSlug: {eq: ' + request.query.githubUser + '}}) {count}}',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': process.env.DATOCMS_TOKEN
                },
            }
        )
    
        if (!resultado.ok) {
            alert('Não foi possível retornar as comunidades. Erro HTTP: ' + resultado.status);
            return;
        }
    
        const resultadoJson = await resultado.json();

        const comunidades = resultadoJson.data.allCommunities.map((it) => {
            return {
                id: it.id,
                title: it.title,
                image: it.imageUrl,
                urlRef: it.referenceUrl
            }
        });
    
        response.json({
            comunidades,
            total: resultadoJson.data._allCommunitiesMeta.count
        })
        return;
    } 

    response.status(404).json({
        message: 'Endpoint não encontrado'
    })

}