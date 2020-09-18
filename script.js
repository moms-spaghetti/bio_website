var imageTextTitle = [];
var imageTextDesc = [];

fetch('imgTextData.csv')
  .then(response => response.text())
  .then(line => {

    var lines = line.split('\n');
    for(var i = 0; i < lines.length; i+=2){
        imageTextTitle.push(lines[i]);
        var j = i + 1;
        imageTextDesc.push(lines[j]);
    }

    for (var i = 0; i < imageTextTitle.length; i++) {

        var imgElement = document.getElementById('images');

        var imgElementContent = '<div class="img-container" id="img-container-' + i + '"> \
         <a href="#" onclick="return false;"><img id="img-' + i + '" src="images/' + i + '.jpg" alt=""> \
         </a><div class="img-text"><h2 class="img-title">' + imageTextTitle[i] + '</h2> \
         <p class="img-desc">' + imageTextDesc[i] + '</p></div></div>';

        imgElement.insertAdjacentHTML('beforeend', imgElementContent);
    }
    
  });

