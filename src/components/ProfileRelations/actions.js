import { TOKEN_DATO, URL_DATO } from "../../lib/AlurakutCommons";
const { SiteClient } = require("datocms-client");
const client = new SiteClient(TOKEN_DATO);

export async function getFollowers(user) {
    
    const urlUser = `https://api.github.com/users/${user}`;
    const apiResponseUser = await fetch(urlUser);

    if (!apiResponseUser.ok) {
        alert('Não foi possível retornar os dados do usuário. Erro HTTP: ' + apiResponseFollowers.status);
        return;
    }

    const urlFollowers = `https://api.github.com/users/${user}/followers`;
    const apiResponseFollowers = await fetch(urlFollowers);

    if (!apiResponseFollowers.ok) {
        alert('Não foi possível retornar os seguidores do usuário. Erro HTTP: ' + apiResponseFollowers.status);
        return;
    }

    const apiResponseUserJson = await apiResponseUser.json();
    const apiResponseFollowersJson = await apiResponseFollowers.json();

    const topFollowers = apiResponseFollowersJson.slice(0, 9);

    const followersToShow = await Promise.all(topFollowers.map(async it => {
        return getFollowersInfo(it.login)
    })).then( (results) => {
        return results;
    })

    return {
        quantidade: apiResponseUserJson.followers,
        followersToShow: followersToShow
    };
}

async function getFollowersInfo(user) {
    const urlUser = `https://api.github.com/users/${user}`;
    const apiUserResponse = await fetch(urlUser);

    if (!apiUserResponse.ok) {
        alert('Não foi possível retornar os dados dos seguidores. Erro HTTP: ' + apiResponseFollowers.status);
        return;
    }

    const apiUserJson = await apiUserResponse.json();

    return {
        id: user,
        title: `${user} (${apiUserJson.followers})`,
        image: `https://github.com/${user}.png`,
        urlRef: `https://github.com/${user}`
    };
}

export async function getCommunities() {
    const resultado = await fetch(
        URL_DATO + '?query={allCommunities(first: 9, orderBy: [_firstPublishedAt_ASC]) {id, title, imageUrl, referenceUrl, _status, _firstPublishedAt}, _allCommunitiesMeta {count}}',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': TOKEN_DATO
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

    console.log(resultadoJson)

    return {
        comunidades,
        total: resultadoJson.data._allCommunitiesMeta.count
    }
}

export async function pushCommunity(dadosComunidade) {
    try {
        await client.items.create({
            itemType: '966632',
            title: dadosComunidade.title,
            imageUrl: dadosComunidade.image,
            referenceUrl: dadosComunidade.urlRef,
        });
    } catch (e) {
        throw e;
    }
}