const algoliasearch = require("algoliasearch");
const algoliasearchHelper = require("algoliasearch-helper");

const applicationID = "YEF3FUMF7I";
const apiKey = "7a8595e0981d765c076de998c602ab77";
const indexName = "restaurantlist";

var client = algoliasearch(applicationID, apiKey);
var helper = algoliasearchHelper(client, indexName);

function init() {
  $(".cardIcon, .filterRow").click(function () {
    $(this).toggleClass("selected");
  });

  helper.on("result", function (content) {
    renderHits(content);
  });

  helper.search();
}

function renderHits(content) {
  $("#container").html(JSON.stringify(content, null, 2));
}
// $(document).ready(init);

// app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
