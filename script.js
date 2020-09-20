//two arrays for title and description image data one for day
var imageTextTitle = [];
var imageTextDesc = [];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//day function for my profile pic 
function getDate() {
  var date = new Date();
  return date.getDay();
}

//parses the csv file for image text info
fetch('imgTextData.csv')
  .then(response => response.text())
  .then(line => {

    //split to separate lines, pushes lines odd even odd 
    //etc to both array + helper variable to adjust for second array offset to pull data
    var lines = line.split('\n');
    for (var i = 0; i < lines.length; i += 2) {
      imageTextTitle.push(lines[i]);
      var j = i + 1;
      imageTextDesc.push(lines[j]);
    }

    //another array for random indexes to allow for image location randomisation
    var randomNumbers = [];

    for (var i = 0; i < imageTextTitle.length; i++) {
      randomNumbers.push(i);
    };

    //algo for unsort of randomNumber array passed in as arg 
    //(need to look at getting this to run without calling)
    //info - Knuth Shuffle
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    }

    //randomise array 
    shuffle(randomNumbers);

    //loop to insert images + title + desc data
    //theRealI is helper to keep copy of 'i' until end of 
    //loop for benefit of loop else finishes at random intervals
    for (var i = 0; i < imageTextTitle.length; i++) {

      var theRealI = i;
      var i = randomNumbers[theRealI];

      //image container id - these are going inside
      var imgElement = document.getElementById('images');

      //string + all data sources for title, text and image
      var imgElementContent = '<div class="img-container" id="img-container-' + i + '"> \
         <img id="img-' + i + '" src="images/' + i + '.jpg" alt=""> \
         <div class="img-text"><h2 class="img-title">' + imageTextTitle[i] + '</h2> \
         <p class="img-desc">' + imageTextDesc[i] + '</p></div></div>';

      //remember adjacent as doesn't rebuild DOM
      imgElement.insertAdjacentHTML('beforeend', imgElementContent);

      //return 'i' to original value for benefit of 
      //loop and allows full loop of .length of imageTextTitle 
      i = theRealI;
    };

    //CSV has spans + id to accept values from here for 
    //dynamic image counter + day into on profile pic
    document.getElementById('imgCount').innerHTML = imageTextTitle.length;
    document.getElementById('day').innerHTML = days[getDate()];
  });


//mouse over to find image id for location
//uses event arg to find id of current image where mouse is
//parts of id passed to different things
document.addEventListener('mouseover', function (event) {
  if (event.target.id.substr(0, 3) === 'img') { //first part of id used 'img'
    var modal = document.getElementById('modal-container');
    var img = document.getElementById(event.target.id);
    var modalImg = document.getElementById('modal-content');
    var captionTitle = document.getElementById('img-container-' + event.target.id.substr(4)).children[1].children[0].innerHTML;
    var captionDesc = document.getElementById('img-container-' + event.target.id.substr(4)).children[1].children[1].innerHTML;
    var modalTitle = document.getElementById('modal-title');
    var modalCaption = document.getElementById('modal-caption');

    //shows modal inserts image title + description
    img.onclick = function () {
      modal.style.display = 'block';
      modalImg.src = this.src;
      modalTitle.innerHTML = captionTitle;
      modalCaption.innerHTML = captionDesc;
    };

    //close button 
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    };
  }
});


