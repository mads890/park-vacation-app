'use strict';

function formatParams(params) {
    let paramItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return paramItems.join('&')
    }


function getParks(place, numResults) {
    let params = {
        api_key: '9fdaSwcXv1QemBXYpkc8qY2XmYFX1lKeh5f1pvM3',
        q: place,
        results: numResults
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
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => showError(err))
}

function displayParks(responseJson) {
    $('.results').removeClass('hidden');
    
    $('.resultslist').append(responseJson.forEach(`<li><h2>${responseJson.name}</h2><br/><p>${responseJson.description}</p><br/><p>More info at <a href="${responseJson.url}">${responseJson.url}</a></li>`))
}

function showError(err) {
    $('.error').removeClass('hidden');
    $('.error').append(`<h2>Something went wrong...</h2><br/><p>${err.message}</p>`)
}

function formSubmit() {
    $('form').submit(event => {
        event.preventDefault();
        $('.results').empty().addClass('hidden');
        $('.error').empty().addClass('hidden');
        let state = $('#parksearch').val();
        let parkNum = $('#maxnum').val();
        $('#listheader').append(`${parkNum} Parks of ${state}:`);
        getParks(state, parkNum);
    })
}

$(formSubmit());