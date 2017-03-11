$(document).ready(function(){

    var highestBox = 0;
        $('.list .list_item').each(function(){
                if($(this).height() > highestBox){
                highestBox = $(this).height();
        }
    });
    $('.list .list_item').height(highestBox);

    // $(window).resize(function() {
    // var highestBox = 0;
    //     $('.list .list_item').each(function(){
    //             if($(this).height() > highestBox){
    //             highestBox = $(this).height();
    //     }
    // });
    // $('.list .list_item').height(highestBox);
    // });

});


// TODO fix navbar jquery (window resize)and width
