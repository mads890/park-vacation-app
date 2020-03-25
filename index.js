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
    $('.resultslist').empty();
    console.log(responseJson)
    if (responseJson.data.length > 0) {
    for (let i = 0; i < responseJson.data.length; i++) { 
         $('.resultslist').append(`<li><h2>${responseJson.data[i].name}</h2><p>${responseJson.data[i].description}</p><p>${responseJson.data[i].addresses[1].line1}, ${responseJson.data[i].addresses[1].city} ${responseJson.data[i].addresses[1].stateCode}, ${responseJson.data[i].addresses[1].postalCode}</p><p>More info at <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p></li>`)
        }
    }
    else if (responseJson.data.length == 0) {
        $('.error').removeClass('hidden').append('<h2>No results found.</h2>');

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
        $('.error').empty().addClass('hidden');
        let state = $('#parksearch').val().replace(', ', '&');
        let parkNum = $('#maxnum').val();
        getParks(state, parkNum);
    })
}

$(formSubmit());