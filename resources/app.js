// const algoliasearch = require("algoliasearch");
// const algoliasearchHelper = require("algoliasearch-helper");

const applicationID = "YEF3FUMF7I";
const apiKey = "7a8595e0981d765c076de998c602ab77";
const indexName = "restaurantlist";
const debuggingOn = true;

var client = algoliasearch(applicationID, apiKey);
// var helper = algoliasearchHelper(client, indexName);
var helper = algoliasearchHelper(client, indexName, {
  facets: ["food_type", "stars_count"],
  disjunctiveFacets: ["payment_options"],
});
var currentHitsPerPage = 20;

function init() {
  $(function () {
    currentHitsPerPage = 20;
    helper.setQuery($(this).val()).search();
    debugLog("loaded");
  });

  $(".cardIcon").click(function () {
    $(this).toggleClass("selected");
  });

  helper.on("result", function (content) {
    renderFacetList(content.results);
    renderHits(content.results._rawResults);
    if (content.results.nbPages > 1) {
      $("#showmore").css("display", "block");
      debugLog("block");
    } else {
      $("#showmore").css("display", "none");
      debugLog("none");
    }
    debugLog("CONTENT - " + content);
    debugLog(content);
  });

  // helper.search();
  $("#search-box").on("keyup", function () {
    currentHitsPerPage = 20;
    helper
      .setQuery($(this).val())
      .setQueryParameter("hitsPerPage", currentHitsPerPage)
      .search();
  });

  $("#foodTypeFacet").on("click", "input[type=checkbox]", function (e) {
    var facetValue = $(this).data("facet");
    debugLog(facetValue);
    helper.toggleFacetRefinement("food_type", facetValue).search();
  });

  // $("#showmore").on("click", function () {
  //   currentHitsPerPage += 10;

  //   debugLog("show more " + currentHitsPerPage);
  //   helper.setQueryParameter("hitsPerPage", currentHitsPerPage).search();
  // });
}
function paymentFilterOption(facetValue) {
  // var facetValue = $(e).data("facet");
  debugLog(facetValue, true);
  debugLog(helper.getDisjunctiveRefinements("payment_options"), true);
  helper.addDisjunctiveFacetRefinement("payment_options", facetValue);
  if (facetValue == "Discover") {
    debugLog("this is discover");
    helper.addDisjunctiveFacetRefinement("payment_options", "Discover");
    helper.addDisjunctiveFacetRefinement("payment_options", "Diners Club");
    helper.addDisjunctiveFacetRefinement("payment_options", "Carte Blanche");
  }
  helper.search();
}
function filterStars(noStars) {
  // debugLog(helper.hasRefinements("stars_count"));
  //DSJ How do I do the rating and sort it?

  // helper
  //   .toggleFacetRefinement("stars_count", noStars + ".0")
  //   .toggleFacetRefinement("stars_count", noStars + ".1")
  //   .toggleFacetRefinement("stars_count", noStars + ".2")
  //   .toggleFacetRefinement("stars_count", noStars + ".3")
  //   .toggleFacetRefinement("stars_count", noStars + ".4")
  //   .toggleFacetRefinement("stars_count", noStars + ".5")
  //   .toggleFacetRefinement("stars_count", noStars + ".6")
  //   .toggleFacetRefinement("stars_count", noStars + ".7")
  //   .toggleFacetRefinement("stars_count", noStars + ".8")
  //   .toggleFacetRefinement("stars_count", noStars + ".9")
  //   .search();

  // if (helper.hasRefinements("stars_count")) {
  //   debugLog(
  //     "do we already have: " +
  //       noStars +
  //       " - " +
  //       helper.getNumericRefinement("stars_count", ">="),
  //     true
  //   );
  //   if (helper.getNumericRefinement("stars_count", ">=").includes(noStars)) {
  //     debugLog("we already have: - " + noStars, true);
  //     helper.removeNumericRefinement("stars_count", ">=", noStars).search();
  //     debugLog("we have removed: " + noStars, true);
  //   } else {
  //     helper.addNumericRefinement("stars_count", ">=", noStars).search();
  //   }
  // } else {
  //   helper.addNumericRefinement("stars_count", ">=", noStars).search();
  // }
  $("#ratingStarsSection .filterRow").removeClass("selected");
  if (helper.hasRefinements("stars_count")) {
    debugLog("has: " + helper.getNumericRefinement("stars_count", ">="));
    if (!helper.getNumericRefinement("stars_count", ">=").includes(noStars)) {
      helper.removeNumericRefinement("stars_count");
      helper.addNumericRefinement("stars_count", ">=", noStars).search();
      $(`#ratingStarsSection .filterRow:nth-child(${noStars + 1})`).addClass(
        "selected"
      );
    } else {
      helper.removeNumericRefinement("stars_count").search();
    }
  } else {
    helper.addNumericRefinement("stars_count", ">=", noStars).search();
    $(`#ratingStarsSection .filterRow:nth-child(${noStars + 1})`).addClass(
      "selected"
    );
  }

  //set selections

  // for (let i = noStars; i > 0; i--) {

  // }

  // debugLog(helper.hasRefinements("stars_count"));

  // helper.search("query", {
  //   filters: `stars_count:${noStars} TO ${noStars + 1}`,
  // });
  // debugLog("star count filter");
  // helper.search("query", {
  //   filters: "stars_count: 4 TO 5",
  // });
}
function showMoreFunction() {
  currentHitsPerPage += 10;

  debugLog("show more " + currentHitsPerPage);
  helper.setQueryParameter("hitsPerPage", currentHitsPerPage).search();
}
function renderHits(results) {
  // $("#container").html(JSON.stringify(results, null, 2));
  debugLog(results[0].nbHits);

  $("#resultCardsArea").html(function () {
    var resultsHTML = $.map(results[0].hits, function (hit) {
      return createResultCard(hit);
      // return "<li>" + hit.name + "</li>";
    });

    return resultsHTML;
  });
  $("#resultCardsArea").append(function () {
    return showMore;
  });
  $("#resultSummary").html(function () {
    var resultsSummary;
    const hits = results[0].nbHits;
    if (hits == 0) {
      resultsSummary = "no results found.";
    } else if (hits == 1) {
      resultsSummary = "1 result found";
    } else {
      resultsSummary = hits + " results found";
    }
    return resultsSummary;
  });
  $("#resultTime").html(function () {
    return " in " + results[0].processingTimeMS / 1000 + " seconds";
  });
}
const showMore = `
<button id="showmore" type="button" onclick="showMoreFunction()" class="btn btn-light">
      Show More
    </button>
`;
function createResultCard(hit) {
  const percent = Math.min((hit.stars_count + 0.1) * 20, 100);
  const tempResultCard = `
  <div class="resultCard row">
    <div class="col-md-2">
    <img
        class="resultImage"
        width="100em"
        height="100em"
        src="${hit.image_url}"
    />
    </div>
    <div class="col-md-8 resultContent">
    <div class="row-no-gutters restaurantName">${hit.name}</div>
    <div class="row-no-gutters restaurantRating">
        <div class="rating col-md-1">${hit.stars_count}</div>
        <div class="starHolder col-md-3">
        <div class="stars" style="width:${percent}%;"></div>
        <div>
            <img
            class="starMask"
            src="resources/graphics/stars-iconsMask.png"
            />
        </div>
        </div>
        <div class="reviewCount col-md-1"></div>
        <div class="reviewCount col-md-3">(${hit.reviews_count} reviews)</div>
    </div>
    <div class="row-no-gutters restaurantDescriptionLine">
    <div class="col-md-12">${hit.food_type} | ${hit.neighborhood} | ${hit.price_range}</div>
    </div>
    </div>
  </div>
`;
  return tempResultCard;
}

function renderFacetList(content) {
  debugLog("CONTENT facets");
  debugLog(content);
  debugLog(content.getFacetValues("food_type"));
  $("#foodTypeFacet").html(function () {
    return $.map(content.getFacetValues("food_type"), function (facet) {
      var checkbox = $(`<input type=checkbox style="display:none">`)
        .data("facet", facet.name)
        .attr("id", "fl-" + facet.name);
      if (facet.isRefined) {
        checkbox.attr("checked", "checked");
      }
      var label = $(`<label class="filterRow cuisineFilter">`)
        .html(facet.name + "     " + facet.count)
        .attr("for", "fl-" + facet.name);
      return $(`<div class="col-md-10">`).append(checkbox).append(label);
    });
  });
}

// function renderFacetList(content) {
//   debugLog("CONTENT facets");
//   debugLog(content);
//   debugLog(content.getFacetValues("food_type"));
//   $("#foodTypeFacet").html(function () {
//     return $.map(content.getFacetValues("food_type"), function (facet) {
//       var checkbox = $("<input type=checkbox>")
//         .data("facet", facet.name)
//         .attr("id", "fl-" + facet.name);
//       if (facet.isRefined) {
//         checkbox.attr("checked", "checked");
//       }
//       var label = $("<label>")
//         .html(facet.name + " (" + facet.count + ")")
//         .attr("for", "fl-" + facet.name);
//       return $("<li>").append(checkbox).append(label);
//     });
//   });
// }

$(document).ready(init);

// app.listen(4242, () => debugLog(`Node server listening on port ${4242}!`));

function debugLog(debugmessage, high) {
  if (debuggingOn || high) console.log(debugmessage);
}
// function debugLogHigh(debugmessage) {
//   console.log(debugmessage);
// }
