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
    // const urlUser = `https://api.github.com/users/${user}`;
    // const apiUserResponse = await fetch(urlUser);

    // if (!apiUserResponse.ok) {
    //     alert('Não foi possível retornar os dados dos seguidores. Erro HTTP: ' + apiResponseFollowers.status);
    //     return;
    // }

    // const apiUserJson = await apiUserResponse.json();

    return {
        id: user,
        title: `${user}`,
        image: `https://github.com/${user}.png`,
        urlRef: `https://github.com/${user}`
    };
}

export async function getCommunities(props) {
    const resultado = await fetch('/api/getComunidades?githubUser=' + props.githubUser)

    if (!resultado.ok) {
        alert('Não foi possível retornar as comunidades. Erro HTTP: ' + resultado.status);
        return;
    }

    const resultadoJson = await resultado.json();

    return resultadoJson;
}

export async function pushCommunity(dadosComunidade) {

    const comunidade = {
        title: dadosComunidade.title,
        imageUrl: dadosComunidade.image,
        referenceUrl: dadosComunidade.urlRef,
        creatorSlug: dadosComunidade.criador
    };

    await fetch(
        '/api/postComunidade', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(comunidade)
    })
    
}

export async function getScraps(props) {
    const resultado = await fetch('/api/getScraps?githubUser=' + props.githubUser)

    if (!resultado.ok) {
        alert('Não foi possível retornar os scraps. Erro HTTP: ' + resultado.status);
        return;
    }

    const resultadoJson = await resultado.json();

    return resultadoJson;
}

export async function pushScrap(dadosScrap) {
    await fetch(
        '/api/postScrap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(dadosScrap)
        }
    )
}