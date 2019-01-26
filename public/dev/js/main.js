$(function () {
    var $window = $(window),
        currentGallery = {};

    $(".js_reviews_slick").slick({
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true/*,
        adaptiveHeight: true*/
    });


    $('.select').select2();


    $('.js_goto_anchor').bind("click", function(e){
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 30
        }, 1000);
        e.preventDefault();
        if ($window.width() <= 992){
            $('.header__hamburger').removeClass('header__hamburger_is-active_true');
            $('.header__mobile').removeClass('header__mobile_is-state_true');
            $('.mobile-menu').removeClass('mobile-menu_is-active_true');
        }
    });


    //==== Форма "Записаться"
    $('.js_call_back').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    });


    //==== Форма "Вступление"
    $('.js_offer').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = 'mfp-zoom-in';
            }
        },
        midClick: true
    }).on('click', function () {
        $('.js_offer_name').val($(this).data('offerName'));
    });


    $('.js_open_gallery').on('click', function () {
        currentGallery = galleries[$(this).data('galleryId')];

        $.magnificPopup.open({
            type: 'image',
            items: currentGallery,
            tLoading: 'Загружается изображение #%curr%...',
            closeBtnInside: false,
            removalDelay: 300,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1],
                tPrev: 'Предыдущее',
                tNext: 'Следующее',
                tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
            },
            image: {
                tError: '<a href="%url%">Изображение #%curr%</a> не удается загрузить.',
                titleSrc: 'title'
            },
            callbacks: {
                beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.gallery.arrowMarkup = this.st.gallery.arrowMarkup.replace('mfp-arrow', 'mfp-arrow mfp-with-anim');
                    this.st.closeMarkup = this.st.closeMarkup.replace('mfp-close', 'mfp-close mfp-with-anim');
                    this.st.mainClass = 'mfp-zoom-in';
                }
            }
        });
    });
});