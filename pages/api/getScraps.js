export default async function getScraps (request, response) {

    if (request.method === 'GET') {
        const resultado = await fetch(
            'https://graphql.datocms.com?query={allScraps(first: 10, orderBy: [_firstPublishedAt_DESC], filter: {targetUser: {eq: ' + request.query.githubUser + '}}) {id, user, imageUrl, dateTime, message, _status, _firstPublishedAt}, _allScrapsMeta (filter: {targetUser: {eq: ' + request.query.githubUser + '}}) {count}}',
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
        const scraps = resultadoJson.data.allScraps.map((it) => {
            return {
                id: it.id,
                user: it.user,
                imageUrl: it.imageUrl,
                dateTime: it.dateTime,
                message: it.message
            }
        });
    
        response.json({
            scraps,
            total: resultadoJson.data._allScrapsMeta.count
        })
        return;
    } 

    response.status(404).json({
        message: 'Endpoint não encontrado'
    })

}