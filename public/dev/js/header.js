$(function() {
    $('.header__hamburger').click(function () {
        $(this).toggleClass('header__hamburger_is-active_true');
        $('.header__mobile').toggleClass('header__mobile_is-state_true');
        $('.mobile-menu').toggleClass('mobile-menu_is-active_true');
    });
});
