$(document).ready(function(){

    var highestBox = 0;
        $('.list .list_item').each(function(){
                if($(this).height() > highestBox){
                highestBox = $(this).height();
        }
    });
    $('.list .list_item').height(highestBox);

    // $(window).resize(function() {
    //    if ($(window).width() > 768) {
    //       $('.navbar-links').show();
    //    } else {
    //       $('.navbar-links').hide();
    //    }
    // });

});

// TODO fix navbar jquery (window resize)and width
