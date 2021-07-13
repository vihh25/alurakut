export async function getFollowers(user) {
    
    const url = `https://api.github.com/users/${user}/followers`;
    const apiResponse = await fetch(url);

    const apiResponseJson = await apiResponse.json();

    const topFollowers = apiResponseJson.slice(0, 9);

    const followersToShow = await Promise.all(topFollowers.map(async it => {
        return getFollowersInfo(it.login)
    })).then( (results) => {
        return results;
    })

    return {
        quantidade: apiResponseJson.length,
        followersToShow: followersToShow
    };
}

async function getFollowersInfo(user) {
    const urlFollower = `https://api.github.com/users/${user}/followers`;
    const apiFollowerResponse = await fetch(urlFollower);
    const apiFollowerNumber = await apiFollowerResponse.json();

    return {
        id: user,
        title: `${user} (${apiFollowerNumber.length})`,
        image: `https://github.com/${user}.png`,
        urlRef: `https://github.com/${user}`
    };
}