/**
 * @file pageInsights.js:
 * @fileOverView This code implements the third of the P2 Javascript challenges
 * @author Gregory Colin
*/
// Change history:
// 19NOV14 - Written / submitted
// 19NOV14 - Rename variables in totalBytes()
// 08DEC14 - Rewrite comments

/**
 * @function
 * @name ruleList
 * @param {Object} results
 * @returns {string[]}
 * @description Given a parameter object containing JSON as returned from Google's PageSpeedInsights,
 *              iterate over the subset defined by "formattedResults.ruleResults" and return an array
 *              of the rule names that were applied in Google's test.
*/
function ruleList(results) {
    var ruleNames = [];
    
    for (var i in results.formattedResults.ruleResults) {
        ruleNames.push(results.formattedResults.ruleResults[i].localizedRuleName);
    }
    return ruleNames;
}

/**
 * @function
 * @name totalBytes
 * @param {Object} results
 * @returns {int}
 * @description Given a parameter object containing JSON as returned from Google's PageSpeedInsights,
                iterate over the subset defined by "pageStats" and compute the total bytes involved
                in Google's test.
*/
function totalBytes(results) {
    var ttlBytes = 0;
    for (var i in results.pageStats) {
        if (i.indexOf("Bytes") > -1) {
            ttlBytes = ttlBytes +  parseInt(results.pageStats[i], 10);
        }
    }
    return ttlBytes;
}

/**
 * @constant
 * @name psinsights
 * @description An example result from Google's PageSpeedInsights expressed as JSON
*/
psinsights = {
 "kind": "pagespeedonline#result",
 "id": "/speed/pagespeed",
 "responseCode": 200,
 "title": "PageSpeed Home",
 "score": 90,
 "pageStats": {
  "numberResources": 22,
  "numberHosts": 7,
  "totalRequestBytes": "2761",
  "numberStaticResources": 16,
  "htmlResponseBytes": "91981",
  "cssResponseBytes": "37728",
  "imageResponseBytes": "13909",
  "javascriptResponseBytes": "247214",
  "otherResponseBytes": "8804",
  "numberJsResources": 6,
  "numberCssResources": 2
 },
 "formattedResults": {
  "locale": "en_US",
  "ruleResults": {
    "AvoidBadRequests": {
      "localizedRuleName": "Avoid bad requests",
      "ruleImpact": 0.0
    },
    "MinifyJavaScript": {
      "localizedRuleName": "Minify JavaScript",
      "ruleImpact": 0.1417,
      "urlBlocks": [
      {
        "header": {
       "format": "Minifying the following JavaScript resources could reduce their size by $1 ($2% reduction).",
       "args": [
        {
         "type": "BYTES",
         "value": "1.3KiB"
        },
        {
         "type": "INT_LITERAL",
         "value": "0"
        }
       ]
        },
        "urls": [
        {
          "result": {
         "format": "Minifying $1 could save $2 ($3% reduction).",
         "args": [
          {
           "type": "URL",
           "value": "http://code.google.com/js/codesite_tail.pack.04102009.js"
          },
          {
           "type": "BYTES",
           "value": "717B"
          },
          {
           "type": "INT_LITERAL",
           "value": "1"
          }
         ]
        }
       },
       {
        "result": {
         "format": "Minifying $1 could save $2 ($3% reduction).",
         "args": [
          {
           "type": "URL",
           "value": "http://www.gmodules.com/ig/proxy?url\u003dhttp%3A%2F%2Fjqueryjs.googlecode.com%2Ffiles%2Fjquery-1.2.6.min.js"
          },
          {
           "type": "BYTES",
           "value": "258B"
          },
          {
           "type": "INT_LITERAL",
           "value": "0"
          }
         ]
        }
       }
      ]
     }
    ]
   },
   "SpriteImages": {
    "localizedRuleName": "Combine images into CSS sprites",
    "ruleImpact": 0.0
   }
  }
 },
 "version": {
  "major": 1,
  "minor": 11
 }
};

// Try logging the outputs below to test your code!
console.log(ruleList(psinsights));
console.log(totalBytes(psinsights));