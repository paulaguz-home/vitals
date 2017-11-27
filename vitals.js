
// loads the JSON file
function loadJSON() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
                getProfile(data, 0);
            } catch(err) {
                //console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
        }
    };

    xmlhttp.open("GET", 'records.json', true);
    xmlhttp.send(null);
}

// determines the number of stars for the given provider
// takes the ratings_per_star element from the JSON as a parameter
function getRating(stars){

  var totalRatings = stars[1].total + stars[2].total + stars[3].total + stars[4].total + stars[5].total;
  document.getElementById("ratingcountReviewPage").innerHTML = totalRatings;

  if(totalRatings === 0){
    console.log("there are no ratings");
    displayStars(0);
  }else{
    // calculate ratings
    var totalStars = stars[1].total;
    totalStars += stars[2].total * 2;
    totalStars += stars[3].total * 3;
    totalStars += stars[4].total * 4;
    totalStars += stars[5].total * 5;

    var total = totalStars / totalRatings;

    displayStars(total);
  }
}

// manipulates the CSS to display the correct number of stars for the given provider
// takes the stars rating value calculated in in the getRating function as a parameter
function displayStars(numberofstars){

    document.getElementById("numberofstarsReviewPage").innerHTML = numberofstars;

    var displayStars = document.getElementById("stars");
    var displayStarsRatingsPage = document.getElementById("starsReviewsPage");

    // remove the current class setting
    if(displayStars.classList.contains("FiveStar")){
      displayStars.classList.remove("FiveStar");
      displayStarsRatingsPage.classList.remove("FiveStar");
    }
    if(displayStars.classList.contains("FourStar")){
      displayStars.classList.remove("FourStar");
      displayStarsRatingsPage.classList.remove("FourStar");
    }
    if(displayStars.classList.contains("ThreeStar")){
      displayStars.classList.remove("ThreeStar");
      displayStarsRatingsPage.classList.remove("ThreeStar");
    }
    if(displayStars.classList.contains("TwoStar")){
      displayStars.classList.remove("TwoStar");
      displayStarsRatingsPage.classList.remove("TwoStar");
    }
    if(displayStars.classList.contains("OneStar")){
      displayStars.classList.remove("OneStar");
      displayStarsRatingsPage.classList.remove("OneStar");
    }
    if(displayStars.classList.contains("NoStar")){
      console.log("contains NoStar value");
      displayStars.classList.remove("NoStar");
      displayStarsRatingsPage.classList.remove("NoStar");
    }

    // add the new class setting
    if(numberofstars === 1){
      displayStars.classList.add("OneStar");
      displayStarsRatingsPage.classList.add("OneStar");
    }else if (numberofstars === 2){
      displayStars.classList.add("TwoStar");
      displayStarsRatingsPage.classList.add("TwoStar");
    }else if (numberofstars === 3){
      displayStars.classList.add("ThreeStar");
      displayStarsRatingsPage.classList.add("ThreeStar");
    }else if (numberofstars === 4){
      displayStars.classList.add("FourStar");
      displayStarsRatingsPage.classList.add("FourStar");
    }else if (numberofstars === 5){
      displayStars.classList.add("FiveStar");
      displayStarsRatingsPage.classList.add("FiveStar");
    }else{
      displayStars.classList.add("NoStar");
      displayStarsRatingsPage.classList.add("NoStar");
    }
}

// gets the profile data from the JSON file and inserts it into the html
// takes the JSON data and the index value for the given provider as a parameter
function getProfile(data, index){

  document.getElementById("name").innerHTML = data[index].prefix + " " + data[index].first + " " + data[index].last + " " + data[index].degrees;
  document.getElementById("specialty").innerHTML = data[index].primary_specialty;

  getRating(data[index].ratings_per_star);

  var imageValue = data[index].photo;
  var defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1000px-User_font_awesome.svg.png";

  if(imageValue === undefined){
    document.getElementById("profileImgSrc").src = defaultImage;
  }else{
    document.getElementById("profileImgSrc").src = imageValue;
  }

  document.getElementById("city_state").innerHTML = data[index].city_state;
  document.getElementById("phone").innerHTML = data[index].phone;
  document.getElementById("school").innerHTML = data[index].school;

  document.getElementById("summaryPageName").innerHTML = "About " + data[index].prefix + " " + data[index].first + " " + data[index].last;

  getLocations(data, index);
}

// reads the locations element from the JSON profile
// takes the JSON data and the index value of the provider as a parameter
function getLocations(data, index){

  for (i = 0; i < data[index].locations.length; i++) {
    drawLocation(data[index].locations[i]);
  }
}

// writes the HTML for the location record
// takes the index value for each of the location elements for the given provider as a parameter
function drawLocation(i){
      var htmlContentBlock = " ";

      htmlContentBlock += "<div class='locationRecordContainer'>";
      htmlContentBlock += "<div class='mapPlaceHolder'></div>";
      htmlContentBlock += "<div class='locationAddressContainer'>";
      htmlContentBlock += "<div class='locationAddressCompanyName'>" + i.name +"</div>";
      htmlContentBlock += "<div class='locationAddress'>" + i.address1 + "</div>";
      htmlContentBlock += "<div class='locationAddress'>" + i.city + ", " + i.state +" " + i.zip +"</div>";
      htmlContentBlock += "</div>";
      htmlContentBlock += "</div>";
      htmlContentBlock += "</div>";

      document.getElementById("directionsContentContainer").innerHTML = htmlContentBlock;
}

// manipulates the CSS in order to show and hide the 'summary', 'locations' and 'ratings'  content contentContainers
// takes the id of the link that's been clicked
function changeContent(clikedId){

    // hide all content blocks
    document.getElementById("summaryContentContainer").style.display='none';
    document.getElementById("navSum").classList.remove("selectedLink");

    document.getElementById("directionsContentContainer").style.display='none';
    document.getElementById("navDir").classList.remove("selectedLink");

    document.getElementById("reviewsContentContainer").style.display='none';
    document.getElementById("navRev").classList.remove("selectedLink");

    // show the content block selected
    switch(clikedId) {
    case 'sum':
        document.getElementById("summaryContentContainer").style.display='inline-block';
        document.getElementById("navSum").classList.add("selectedLink");
        break;
    case 'dir':
        document.getElementById("directionsContentContainer").style.display='inline-block';
        document.getElementById("navDir").classList.add("selectedLink");
        break;
    case 'rev':
        document.getElementById("reviewsContentContainer").style.display='inline-block';
        document.getElementById("navRev").classList.add("selectedLink");
        break;
    default:
        // show summary content block by default
        document.getElementById("summaryContentContainer").style.display='inline-block';
        document.getElementById("navSum").classList.add("selectedLink");
      }
}
