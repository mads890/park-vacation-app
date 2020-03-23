'use strict';

function formatParams(params) {
    let paramItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return paramItems.join('&')
    }


function getParks(place, numResults) {
    let params = {
        api_key: '9fdaSwcXv1QemBXYpkc8qY2XmYFX1lKeh5f1pvM3',
        q: place,
        limit: numResults
    }
    let queryString = formatParams(params);
    const url = 'https://developer.nps.gov/api/v1/parks?' + queryString;

    fetch(url)
    .then(response => {
        if (response.status == 200) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
    })
    .then(responseJson => displayParks(responseJson))
    .catch(err => showError(err))
}

function displayParks(responseJson) {
    $('.results').removeClass('hidden');
    let results = responseJson.data;
    for (let i = 0; i < results.length; i++) { 
          $('.resultslist').append(`<li><h2>${results[i].name}</h2><p>${results[i].description}</p><p>More info at <a href="${results[i].url}">${results[i].url}</a></p></li>`)
        }
}

function showError(err) {
    $('.error').removeClass('hidden');
    $('.error').append(`<h2>Something went wrong...</h2><br/><p>${err.message}</p>`)
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.results').addClass('hidden');
        $('.resultslist').empty();
        $('.error').empty().addClass('hidden');
        let state = $('#parksearch').val();
        let parkNum = $('#maxnum').val();
        getParks(state, parkNum);
    })
}

$(formSubmit());
