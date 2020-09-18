var imageTextTitle = [];
var imageTextDesc = [];

fetch('imgTextData.csv')
  .then(response => response.text())
  .then(line => {

    var lines = line.split('\n');
    for (var i = 0; i < lines.length; i += 2) {
      imageTextTitle.push(lines[i]);
      var j = i + 1;
      imageTextDesc.push(lines[j]);
    }

    var randomNumbers = [];

    for (var i = 0; i < imageTextTitle.length; i++) {
      randomNumbers.push(i);
    };

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

    shuffle(randomNumbers);

    for (var i = 0; i < imageTextTitle.length; i++) {

      var theRealI = i;
      var i = randomNumbers[theRealI];

      var imgElement = document.getElementById('images');

      var imgElementContent = '<div class="img-container" id="img-container-' + i + '"> \
         <a href="#" onclick="return false;"><img id="img-' + i + '" src="images/' + i + '.jpg" alt=""> \
         </a><div class="img-text"><h2 class="img-title">' + imageTextTitle[i] + '</h2> \
         <p class="img-desc">' + imageTextDesc[i] + '</p></div></div>';

      imgElement.insertAdjacentHTML('beforeend', imgElementContent);

      i = theRealI;
    };

  });
