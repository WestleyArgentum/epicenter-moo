var href = window.location.href.split(/\//);
var host = window.location.host;
var app = /(app)/.test(href);
var id;

function initializeModel (modelName, callback) {
  $.ajax({
      url: 'http://' + getHost() + '/model/run',
      data: JSON.stringify({'account': getAccount(), 'project': getProject(), 'model': modelName}),
      contentType: 'application/json', dataType: 'json', type: 'POST',
      success: function (response) {
        id = response.id;
        callback();
      }
    })
}

function getVariable (variable_name, callback) {
   $.ajax({
      url: 'http://' + getHost() + '/model/variable/' + id + '/' + encodeURIComponent(variable_name),
      success: callback
    });
}

function getVariables (variableArray, callback) {
    var queryParameters = ""
    variableArray.each(function(item) {
        queryParameters = queryParameters + "name=" + encodeURIComponent(item) + "&"
    });
    $.ajax({
      url: 'http://' + getHost() + '/model/variable/' + id + '?' + queryParameters,
      success: callback
    });
}

function callOperation (operation_name, argumentArray, callback) {
   $.ajax({
      url: 'http://' + getHost() + '/model/operation/' + id,
      data: JSON.stringify({'name': operation_name, 'arguments': argumentArray}),
      contentType: 'application/json', type: 'POST',
      success: function (response) {
        callback(response.result);
      }
    });
}

function setParameter (parameterName, parameterValue, callback) {
   var parameterMap = {};
   parameterMap[parameterName] = parameterValue;

   $.ajax({
      url: 'http://' + getHost() + '/model/variable/' + id,
      data: JSON.stringify(parameterMap),
      contentType: 'application/json', type: 'PATCH',
      success: function (response) {
        callback(response);
      }
    });
}
function setParameters (parameterMap, callback) {
   $.ajax({
      url: 'http://' + getHost() + '/model/variable/' + id,
      data: JSON.stringify(parameterMap),
      contentType: 'application/json', type: 'PATCH',
      success: function (response) {
        callback(response);
      }
    });
}

function getAccount () {
    return app ? href[href.indexOf('app') + 1] : href[href.indexOf(host) + 1];
}

function getProject () {
    return app ? href[href.indexOf('app') + 2] : href[href.indexOf(host) + 2];
}

function getHost () {
    return 'api.' + host;
}

