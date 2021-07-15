const { SiteClient } = require("datocms-client");

const client = new SiteClient(process.env.DATOCMS_TOKEN);

export default async function postCommunity (request, response) {

    if (request.method === 'POST') {
        try {
            const registro = await client.items.create({
                itemType: '966632',
                ...request.body,
            });

            response.json({
                registro
            })
            return;
        } catch (e) {
            throw e;
        }
    } 

    response.status(405).json({
        message: 'Method not allowed'
    })

}