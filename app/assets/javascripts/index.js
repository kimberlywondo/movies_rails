function highestBox() {
    var highestBox = 0;
    $('.list .list_item').each(function(){
     if ($(this).height() > highestBox ) {
       highestBox = $(this).height();
     }
    });
    $('.list .list_item').height(highestBox);
}

// $(document).ready(function(){
//
//     var highestBox = 0;
//         $('.list .list_item').each(function(){
//                 if($(this).height() > highestBox){
//                 highestBox = $(this).height();
//         }
//     });
//     $('.list .list_item').height(highestBox);
// });

$(document).ready(highestBox);
$(window).load(highestBox);
$(window).resize(highestBox);
