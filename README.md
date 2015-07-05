# Simple Star Rating using AngularJS

This basic component offers star rating for reviews. It displays the reviews and fills up the stars based on the rating 1, 2, 3, etc. Also, it shows the total number of reviews, provides average rating and partially filled star if the the rating is not an integer (i.e 4.3 average rating). In addition, it fills up a bar based on each rating (similar to app store review rating counts).

The max rating depends on the `scoringsystem` defined in the source file(`data.json`), thus you can have less or more than 5 star ratings. The star fill color can be set in the CSS.

Due to its simplicity, all the JS/AngularJS code is combined into one file. However, it is recommended to break it into separate files!

![Screenshot](public_html/images/screenshot01.jpg?raw=true "Screenshot")