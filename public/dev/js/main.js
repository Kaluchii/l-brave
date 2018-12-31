$(function () {
    var $window = $(window);

    $(".js_reviews_slick").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        adaptiveHeight: true
    });

    $('.select').select2();

    $('.js_goto_anchor').bind("click", function(e){
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top-30
        }, 1000);
        e.preventDefault();
        if ($window.width() <= 992){
            $('.header__hamburger').removeClass('header__hamburger_is-active_true');
            $('.header__mobile').removeClass('header__mobile_is-state_true');
            $('.mobile-menu').removeClass('mobile-menu_is-active_true');
        }
    });
});