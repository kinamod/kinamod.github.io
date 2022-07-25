import algoliasearch from "algoliasearch";
import fileFetch from "file-fetch";
import csv from "csvtojson";

const client = algoliasearch("YEF3FUMF7I", "7a8595e0981d765c076de998c602ab77");

const index = client.initIndex("restaurantlist");

const fromJSONFile = await fileFetch(
  "./resources/dataset/restaurants_list.json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    return products;
  });

const fromCSVFile = await csv({
  delimiter: ";",
  colParser: {
    stars_count: "number",
    reviews_count: "number",
  },
})
  .fromFile("./resources/dataset/restaurants_info.csv")
  .then(function (jsonArrayObj) {
    return jsonArrayObj;
  });

console.log("CSV - " + JSON.stringify(fromCSVFile));
console.log("");
console.log("JSON - " + JSON.stringify(fromJSONFile));

const csvUploaded = await index.saveObjects(fromCSVFile, {
  autoGenerateObjectIDIfNotExist: true,
});
console.log("CSV uploaded - " + csvUploaded);

const jsonUploaded = await index.partialUpdateObjects(fromJSONFile);
console.log("");
console.log("JSON uploaded - " + jsonUploaded);
