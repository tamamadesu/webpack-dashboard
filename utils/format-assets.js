"use strict";

var filesize = require('filesize');
var color    = require("colors");

function formatAssets(stats) {
  var json = stats.toJson();
  var tree;
  if (!json.hasOwnProperty('assets')) {
    tree = json.children.map(getAssets);
  } else {
    tree = [getAssets(json)];
  }
  return printAssets(tree);
}

function getAssets(stats) {
  return stats.assets;
}

function printAssets(tree) {
  var total = 0;
  var output = [
    ['Name', 'Size']
  ];
  tree.forEach(function(assets) {
    assets.forEach(function(asset) {
      if ( asset.name.indexOf('hot-update') < 0 ) {
        total += asset.size;
        output.push([color.magenta(asset.name), color.cyan(filesize(asset.size))]);
      }
    });
  });

  output.push([color.gray('Total'), color.cyan(filesize(total))]);

  return output;
}

module.exports = formatAssets;
