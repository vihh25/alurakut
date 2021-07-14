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