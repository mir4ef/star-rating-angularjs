// Miroslav Georgiev
"use strict";

(function (ng, appName) {
    /*********************************************/
    /*                Application                */
    /*********************************************/
    var app = ng.module(appName, []);
    
    /*********************************************/
    /*                Controllers                */
    /*********************************************/
    app.controller("PageCtrl", ["$scope", "$http", function ($scope, $http) {
            // make a request to get the reviews
            $http.get("data/data.json").success(function (data) {
                $scope.reviews = data.reviews;

                $scope.starsObj = {}; // object to keep track of votes per star
                $scope.starArr = data.scoringsystem; // array to keep the rating system i.e. 5, 10, etc. stars
                // loop through the array to set the right number of stars to keep track of
                ng.forEach($scope.starArr, function (star) {
                    if (!$scope.starsObj[star])
                        $scope.starsObj[star] = 0;
                });

                var len = $scope.reviews.length;
                var starRating;
                var totalScore = 0;
                $scope.maxVotes = 0; // number to store the max number of votes for a star to use as a base to manage the star distribution
                
                // loop through the ratings and get the scores
                ng.forEach($scope.reviews, function (review) {
                    starRating = parseInt(review.rating);
                    totalScore += starRating; // sum all ratings
                    $scope.starsObj[starRating]++; // keep count of how many votes each star received
                    if ($scope.maxVotes < $scope.starsObj[starRating])
                        $scope.maxVotes = $scope.starsObj[starRating];
                });
                
                $scope.averageRating = totalScore / len;
                if ($scope.averageRating % 1 !== 0)
                    $scope.averageRating = $scope.averageRating.toFixed(1); // round the avg score if it is not an integer
            });
        }]);
    
    /*********************************************/
    /*                Directives                 */
    /*********************************************/
    // directive to fill up the stars based on the rating score
    app.directive("filling", ["$timeout", function (timer) {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    var setFiller = function () {
                        attrs.$observe('starClass', function () {
                            var parentWidth = element[0].offsetWidth;
                            var currentRating = element[0].getAttribute("data-rating");
                            var ratingLength = scope.starArr.length;
                            scope.setWidth = (currentRating / ratingLength) * parentWidth;
                            return scope.setWidth;
                        });
                    };
                    timer(setFiller, 200); // delay the directive execution to give the controller enough time to render the DOM
                }
            };
        }]);
}(angular, "rating"));

/*********************************************/
/*                JavaScript                 */
/*********************************************/
// get and set the current year to fields requiring it like copyright, etc.
var currentYear = new Date().getFullYear(); // get the current year in a YYYY format
var yearFields = document.getElementsByClassName("current-year"); // get all fields that require the year
// loop through all fields and assing the year
for (var i = yearFields.length; i--; )
    yearFields[i].textContent = currentYear;