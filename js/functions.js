$(document).ready(function(){  
    /* Small Menu Btn */
    $('#mobileNavBtn, header .overlay').click(function(){           
        togglePanel();
    });

    /* Placeholder */
    $('input, textarea').placeholder();

});

/* Toggle Panel */
function togglePanel(){
    $(this).toggleClass('selected');
    $("nav").toggleClass('selected'); 
    $('body').toggleClass('panel-on');
};

/* Fit Banner */
function fitMainBanner(){
    var winHeight = $(window).height();
    var bannerImg = $('.main-banner img');

    $('.main-banner').css('height' , winHeight);
};
$(window).resize(function(){
    fitMainBanner();
});

// Map
function loadMap(){
    var map;
    map = new GMaps({
        div: '#googleMap',
        lat: 34.049980, 
        lng: 35.699004,
        zoom: 12,
        // Stop Scroll
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false
    });
    map.addMarker({
        lat: 34.049980, 
        lng: 35.699004,
        title:'The Wedding: The Forest Venue - Adma Ghodras',
        icon: "images/icon-wedding.png"
    });
    map.addMarker({
        lat: 34.0000001, 
        lng: 35.6000001,
        title: 'To Be Announced',
        icon: "images/icon-bachelor.png"
    });
    map.addMarker({
        lat: 34.071395, 
        lng: 35.647631,
        title:'Pre Wedding Party: Saad Mahfouz Residence – Nahr Ibrahim',
        icon: "images/icon-pre-wedding.png"
    });
};

/* Toggle Menu href in FAQ */
function toggleNav(){
    $("nav li a").each(function(){
        var thisLink  = $(this).attr('id').replace('s-','');
        var newHref = '_index.php?'+thisLink;
        $(this).attr('href', newHref);        
    });
    $("nav li a").removeClass('selected');
};
