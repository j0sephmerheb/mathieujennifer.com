// Select Menu on Scroll
$('section').on('reached', function() {
    var thisId= $(this).attr('id');                
    $("nav li a").removeClass('selected').parents('li').removeClass('selected');
    $('#s-'+thisId).addClass('selected').parents('li').addClass('selected'); ;   
});
$(document).on('scroll', function() {
    $('section').each(function() {
        var wt = $(window).scrollTop();
        var st = $(this).position().top;
        var wh = $(window).height();
        var dt = st - wt;

        if( dt >= 0 && dt < 150){
            $(this).trigger('reached');
        }

        if( wt + wh == $(document).height()) {
            $('section:last').trigger('reached');
        }
    });
});

// Menu and Btns Scroll
$("nav li a").click(function(e){   
    var thisLink = $(this);
    var thisHref = thisLink.attr('id').replace('s-','');

    $("nav li a").removeClass('selected').parents('li').removeClass('selected');
    thisLink.addClass('selected').parents('li').addClass('selected');
    $("nav ul").removeClass('selected');

    scrollToLink(thisHref);    
    e.preventDefault();
    return false;
});
$('.scrolllink').click(function(e){   
    var thisLink = $(this);
    var thisHref = thisLink.attr('id').replace('s-','');

    scrollToLink(thisHref);
    e.preventDefault();
    return false;
});
function scrollToLink(e){
    var headerHeight = $('header').height();          
    var scrollDistance = $('#'+e).offset().top - headerHeight;

    $('html, body').stop().animate({
        scrollTop: scrollDistance
        }, 1000);        
};
function scrollOnLoad(){
    var sectionLink = window.location.search.replace('?','');
    if(sectionLink.length){
        if ( $("#"+sectionLink).length ){
            scrollToLink(sectionLink);
            var newUrl = refineUrl();
            window.history.pushState("object or string", "Title", "/"+newUrl );
        }
    }
};
function refineUrl(){
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("?")[0];   
    return value;     
}