document.cookie = "SameSite=None;Secure=True;domain=.giphy.com/";

console.log(document.cookie);

const onChangeSearcher = async () => {
    const searcher = document.getElementById('searcher');
    const currentValue = searcher.value;
    const isMinReached = calculateMinLength(currentValue, 2);
    if (isMinReached) {
        await getGifsSearch(currentValue).then((response) => {
            const searchedGifs = response;
            clearContent();
            populateImages(searchedGifs);
            detectingScroll(currentValue);
        });
    }
}


const populateImages = (searchedGifs) => {
    if (searchedGifs) {
        searchedGifs.data.forEach(element => {
            const imageUrl = getImageUrl(element);
            createNewImageGenerated(imageUrl);
        });
    }
}

const clearContent = () => {
    const searcherImage = document.getElementById('searcher-images-container');
    searcherImage.innerHTML = "";
}

const detectingScroll = (currentValue) => {
    window.onscroll = function () { scrollFunction() };
    let scrollDelay = 400;
    let augmentedOffset = 15;
    const scrollFunction = async () => {
        if (document.body.scrollTop > scrollDelay || document.documentElement.scrollTop > scrollDelay) {
            scrollDelay += scrollDelay;
            await getGifsSearch(currentValue, augmentedOffset).then((response) => {
                augmentedOffset += augmentedOffset;
                const searchedGifs = response;
                populateImages(searchedGifs);
            });
        }
    }
}

const getImageUrl = (item) => {
    let url = item.images.original.url;
    return url;
}

const createNewImageGenerated = (imageUrl) => {
    const searcherImage = document.getElementById('searcher-images-container');
    let img = document.createElement("img");
    img.className = 'generated';
    img.src = imageUrl;
    searcherImage.appendChild(img);
}

const calculateMinLength = (textValue, min) => {
    const result = textValue.length;
    return result > min;
}

const getGifsSearch = async (currentSearch, currentOffset) => {

    const offset = currentOffset || 0;
    let giftsSearch;
    const ACCOUNT_KEY = '7cMMPLqnlrfCoHZe3M6Bhrhs4rDqXWf9';
    const limit = 15;
    const url = 'https://api.giphy.com/v1/gifs/search?q=' + currentSearch + '&api_key=' + ACCOUNT_KEY + '&limit=' + limit + '&offset=' + offset;
    await fetch(url)
        .then(response => response.json())
        .then(data => giftsSearch = data);
    return giftsSearch;
}