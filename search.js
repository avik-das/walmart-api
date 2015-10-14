const _ = require('lodash');
const bluebird = require('bluebird');
const request = require('request');

const requestGet = bluebird.promisify(request.get);

var cachedAPIData = [];

function getAPIDataForId(id) {
  const url = 'http://api.walmartlabs.com/v1/items/' + id +
    '?format=json&apiKey=kjybrqfdgp3u4yv2qzcnjndj';

  return requestGet(url)
    .catch(function(err) {
      console.log('err:', err);
      return null;
    })
    .then(function(data) {
      data = data && data[1];
      if (data) {
        try {
          data = JSON.parse(data);
        } catch (err) {
          console.log('err:', err);
        }
      }

      return data;
    })
    .then(function(data) {
      if (data && data.errors) {
        console.log('err:', data.errors);
      }

      return data;
    });
}

function getCachedAPIData(idsToCache) {
  function getRemaining(remaining, retrievedSoFar) {
    if (remaining.length === 0) {
      return bluebird.resolve(retrievedSoFar);
    }

    return module.exports.internal.getAPIDataForId(remaining[0])
      .then(function(data) {
        process.stdout.write('.');

        // Introduce a delay so we don't hit the API throttle limits
        return bluebird.delay(100)
          .then(function() {
            retrievedSoFar.push(data);
            return getRemaining(remaining.slice(1), retrievedSoFar);
          });
      });
  }

  return getRemaining(idsToCache, [])
    .then(function(all) {
      console.log(); // just a newline
      return _(all)
        .compact()
        .filter('longDescription')
        .value();
    });
}

function init() {
  return module.exports.internal.getCachedAPIData([
    14225185,
    14225186,
    14225188,
    14225187,
    39082884,
    30146244,
    12662817,
    34890820,
    19716431,
    42391766,
    35813552,
    40611708,
    40611825,
    36248492,
    44109840,
    23117408,
    35613901,
    42248076
  ])
    .then(function(data) {
      cachedAPIData = data || [];
    });
}

function searchByKeyword(keyword) {
  return _.filter(cachedAPIData, function(data) {
    return data.longDescription.toLowerCase().indexOf(keyword) >= 0;
  });
}

module.exports.init = init;
module.exports.searchByKeyword = searchByKeyword;

module.exports.internal = {};
module.exports.internal.getAPIDataForId = getAPIDataForId;
module.exports.internal.getCachedAPIData = getCachedAPIData;

// vim: set ts=2 sw=2 :
