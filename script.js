/*
create array
create variable for working number
fill array with numbers from 1 to 54
select id + number from array 
insert image location into src attribute
loop thorugh all elements

*/

var workingNumber = 0;
var numbers = [];

for (var i = 1; i < 55; i++) {
    workingNumber = i;
    document.getElementById('img-' + i).setAttribute("src", "images/" + i + ".jpg");
}


