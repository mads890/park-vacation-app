'use strict';

function formatParams(params) {
    let paramItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return paramItems.join('&')
    }


function getParks(place, numResults) {
    let params = {
        api_key: apiKeyGoesHere,
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
    console.log(responseJson)
    for (let i = 0; i < responseJson.data.length; i++) { 
         $('.resultslist').append(`<li><h2>${responseJson.data[i].name}</h2><p>${responseJson.data[i].description}</p><p>More info at <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>`)
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