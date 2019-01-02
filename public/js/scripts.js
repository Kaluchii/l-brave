$(function () {
    var accordion = $('.js_accordion');
    if (accordion.length) {
        var title = accordion.find('.accordion__item-title');

        title.on('click', function (e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.parent().hasClass('is-open')) {
                $this.parent().removeClass('is-open');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().find('.accordion__item').removeClass('is-open');
                $this.parent().parent().find('.accordion__item-content-wrap').slideUp(350);
                $this.parent().toggleClass('is-open');
                $this.next().slideToggle(350);
            }

            /*var $this = $(this);

            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().find('li .inner').removeClass('show');
                $this.parent().parent().find('li .inner').slideUp(350);
                $this.next().toggleClass('show');
                $this.next().slideToggle(350);
            }*/
        });
    }
});
$(document).ready(function(){
    $('.thank').magnificPopup({
        type: 'inline',
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass ='mfp-zoom-in';
            }
        },
        midClick: true
    });


    // Предотвращение отправки формы через php при нажатии на кнопку
    $('form').submit(function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    // Проверка почты на соответствие маске *@*.*
    function isEmail( mail ){
        var regex = /\S+@\S+/igm;
        return regex.test(mail);
    }


    // Очистка формы
    function clearFields( selector ){
        $(selector).each(function(){
            if( $(this).attr('name') !== 'form'){
                $(this).val('');
                $(this).parent().removeClass('valid');
            }
        });
    }


    // Проверка отдельного поля на валидность
    function fieldValid( input ) {

        if( input.val() !== '' ){

            if ( input.attr('type') === 'email' ){
                return isEmail( input.val() );
            } else {
                return true;
            }

        } else {
            return false;
        }

    }


    // Добавление классов полю по результатам валидации
    function fieldCheck( input ) {

        var parent = input.parent();

        if( fieldValid( input ) ){
            if( parent.hasClass('error') ){
                parent.removeClass('error')
            }
            parent.addClass('valid');

            return true;
        } else {
            if( parent.hasClass('valid') ){
                parent.removeClass('valid')
            }
            parent.addClass('error');

            return false;
        }
    }

    $('.js_form_input').on('change', function () {
        return fieldCheck( $(this) );
    });
    $('.js_form_input').on('focusout', function () {
        $(this).parent().removeClass('filling');
    });
    $('.js_form_input').on('input', function () {
        $(this).parent().addClass('filling');
    });


    // Проверка полей формы на отсутствие пустых полей и валидность
    function fieldsCheck( selector ){
        var checked = true;
        var focus = true;
        $(selector).each( function () {
            checked = fieldCheck( $(this) ) && checked;
            if ( focus && !checked ){
                $(this).focus();
                focus = false;
            }
        });
        return checked;
    }


    // Сбор данных с формы и формирование объекта
    function addFields( selector, object ){

        $(selector).each(function () {
            var $this = $(this);

            object[$this.attr('name')] = $this.val();
        });
    }

    function ajaxDataSend(type, url, data) {
        return $.ajax(
            {
                type: type,
                url: url,
                dataType: 'json',
                data: data,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            }
        );
    }


    var unical, sendButton, selector;
    var active = true;

    function finalValidation() {
        if( active ){
            sendButton = $(this);
            unical = sendButton.closest('.js_form_id').attr('id');
            selector = '#'+unical+' .js_form_input';

            var validForm  = fieldsCheck( selector );

            if ( validForm ){
                active = false;
                sendButton.addClass('load');
                sendForm();
            }
        }
    }

    $('.js_send_form').on('click', finalValidation);


    function sendForm() {

        var dataobj = {};

        addFields( selector, dataobj );

        var response = ajaxDataSend('POST', '/feedback/mail', dataobj);
        response.success(function(data){
            if(!data.error){
                $('.js_thank_link').click();
                clearFields( selector );
            }
            sendButton.removeClass('load');
            active = true;
        });
        response.error(function(data){
            console.log(data);
            sendButton.removeClass('load');
            active = true;
        });
    }
});
$(function() {
    $('.header__hamburger').click(function () {
        $(this).toggleClass('header__hamburger_is-active_true');
        $('.header__mobile').toggleClass('header__mobile_is-state_true');
        $('.mobile-menu').toggleClass('mobile-menu_is-active_true');
    });
});

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


    //==== Форма "Заказать звонок"
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZvcm0uanMiLCJoZWFkZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFjY29yZGlvbiA9ICQoJy5qc19hY2NvcmRpb24nKTtcbiAgICBpZiAoYWNjb3JkaW9uLmxlbmd0aCkge1xuICAgICAgICB2YXIgdGl0bGUgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9faXRlbS10aXRsZScpO1xuXG4gICAgICAgIHRpdGxlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtLWNvbnRlbnQtd3JhcCcpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKnZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpIC5pbm5lcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGkgLmlubmVyJykuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJCgnLnRoYW5rJykubWFnbmlmaWNQb3B1cCh7XG4gICAgICAgIHR5cGU6ICdpbmxpbmUnLFxuICAgICAgICByZW1vdmFsRGVsYXk6IDUwMCxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9J21mcC16b29tLWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWlkQ2xpY2s6IHRydWVcbiAgICB9KTtcblxuXG4gICAgLy8g0J/RgNC10LTQvtGC0LLRgNCw0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0YfQtdGA0LXQtyBwaHAg0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDXG4gICAgJCgnZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyDQn9GA0L7QstC10YDQutCwINC/0L7Rh9GC0Ysg0L3QsCDRgdC+0L7RgtCy0LXRgtGB0YLQstC40LUg0LzQsNGB0LrQtSAqQCouKlxuICAgIGZ1bmN0aW9uIGlzRW1haWwoIG1haWwgKXtcbiAgICAgICAgdmFyIHJlZ2V4ID0gL1xcUytAXFxTKy9pZ207XG4gICAgICAgIHJldHVybiByZWdleC50ZXN0KG1haWwpO1xuICAgIH1cblxuXG4gICAgLy8g0J7Rh9C40YHRgtC60LAg0YTQvtGA0LzRi1xuICAgIGZ1bmN0aW9uIGNsZWFyRmllbGRzKCBzZWxlY3RvciApe1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiggJCh0aGlzKS5hdHRyKCduYW1lJykgIT09ICdmb3JtJyl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQvtGC0LTQtdC70YzQvdC+0LPQviDQv9C+0LvRjyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXG4gICAgZnVuY3Rpb24gZmllbGRWYWxpZCggaW5wdXQgKSB7XG5cbiAgICAgICAgaWYoIGlucHV0LnZhbCgpICE9PSAnJyApe1xuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmF0dHIoJ3R5cGUnKSA9PT0gJ2VtYWlsJyApe1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0VtYWlsKCBpbnB1dC52YWwoKSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L7Qu9GOINC/0L4g0YDQtdC30YPQu9GM0YLQsNGC0LDQvCDQstCw0LvQuNC00LDRhtC40LhcbiAgICBmdW5jdGlvbiBmaWVsZENoZWNrKCBpbnB1dCApIHtcblxuICAgICAgICB2YXIgcGFyZW50ID0gaW5wdXQucGFyZW50KCk7XG5cbiAgICAgICAgaWYoIGZpZWxkVmFsaWQoIGlucHV0ICkgKXtcbiAgICAgICAgICAgIGlmKCBwYXJlbnQuaGFzQ2xhc3MoJ2Vycm9yJykgKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygndmFsaWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiggcGFyZW50Lmhhc0NsYXNzKCd2YWxpZCcpICl7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCd2YWxpZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5qc19mb3JtX2lucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkQ2hlY2soICQodGhpcykgKTtcbiAgICB9KTtcbiAgICAkKCcuanNfZm9ybV9pbnB1dCcpLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZmlsbGluZycpO1xuICAgIH0pO1xuICAgICQoJy5qc19mb3JtX2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmaWxsaW5nJyk7XG4gICAgfSk7XG5cblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L/QvtC70LXQuSDRhNC+0YDQvNGLINC90LAg0L7RgtGB0YPRgtGB0YLQstC40LUg0L/Rg9GB0YLRi9GFINC/0L7Qu9C10Lkg0Lgg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICBmdW5jdGlvbiBmaWVsZHNDaGVjayggc2VsZWN0b3IgKXtcbiAgICAgICAgdmFyIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZm9jdXMgPSB0cnVlO1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja2VkID0gZmllbGRDaGVjayggJCh0aGlzKSApICYmIGNoZWNrZWQ7XG4gICAgICAgICAgICBpZiAoIGZvY3VzICYmICFjaGVja2VkICl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hlY2tlZDtcbiAgICB9XG5cblxuICAgIC8vINCh0LHQvtGAINC00LDQvdC90YvRhSDRgSDRhNC+0YDQvNGLINC4INGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQvtCx0YrQtdC60YLQsFxuICAgIGZ1bmN0aW9uIGFkZEZpZWxkcyggc2VsZWN0b3IsIG9iamVjdCApe1xuXG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgb2JqZWN0WyR0aGlzLmF0dHIoJ25hbWUnKV0gPSAkdGhpcy52YWwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWpheERhdGFTZW5kKHR5cGUsIHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJC5hamF4KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICB2YXIgdW5pY2FsLCBzZW5kQnV0dG9uLCBzZWxlY3RvcjtcbiAgICB2YXIgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGZpbmFsVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYoIGFjdGl2ZSApe1xuICAgICAgICAgICAgc2VuZEJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgICAgICB1bmljYWwgPSBzZW5kQnV0dG9uLmNsb3Nlc3QoJy5qc19mb3JtX2lkJykuYXR0cignaWQnKTtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnK3VuaWNhbCsnIC5qc19mb3JtX2lucHV0JztcblxuICAgICAgICAgICAgdmFyIHZhbGlkRm9ybSAgPSBmaWVsZHNDaGVjayggc2VsZWN0b3IgKTtcblxuICAgICAgICAgICAgaWYgKCB2YWxpZEZvcm0gKXtcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZW5kQnV0dG9uLmFkZENsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICAgICAgc2VuZEZvcm0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5qc19zZW5kX2Zvcm0nKS5vbignY2xpY2snLCBmaW5hbFZhbGlkYXRpb24pO1xuXG5cbiAgICBmdW5jdGlvbiBzZW5kRm9ybSgpIHtcblxuICAgICAgICB2YXIgZGF0YW9iaiA9IHt9O1xuXG4gICAgICAgIGFkZEZpZWxkcyggc2VsZWN0b3IsIGRhdGFvYmogKTtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBhamF4RGF0YVNlbmQoJ1BPU1QnLCAnL2ZlZWRiYWNrL21haWwnLCBkYXRhb2JqKTtcbiAgICAgICAgcmVzcG9uc2Uuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGlmKCFkYXRhLmVycm9yKXtcbiAgICAgICAgICAgICAgICAkKCcuanNfdGhhbmtfbGluaycpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJGaWVsZHMoIHNlbGVjdG9yICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZW5kQnV0dG9uLnJlbW92ZUNsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzcG9uc2UuZXJyb3IoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIiQoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmhlYWRlcl9faGFtYnVyZ2VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX2hhbWJ1cmdlcl9pcy1hY3RpdmVfdHJ1ZScpO1xuICAgICAgICAkKCcuaGVhZGVyX19tb2JpbGUnKS50b2dnbGVDbGFzcygnaGVhZGVyX19tb2JpbGVfaXMtc3RhdGVfdHJ1ZScpO1xuICAgICAgICAkKCcubW9iaWxlLW1lbnUnKS50b2dnbGVDbGFzcygnbW9iaWxlLW1lbnVfaXMtYWN0aXZlX3RydWUnKTtcbiAgICB9KTtcbn0pO1xuIiwiJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgICAgIGN1cnJlbnRHYWxsZXJ5ID0ge307XG5cbiAgICAkKFwiLmpzX3Jldmlld3Nfc2xpY2tcIikuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGRvdHM6IHRydWUvKixcbiAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUqL1xuICAgIH0pO1xuXG5cbiAgICAkKCcuc2VsZWN0Jykuc2VsZWN0MigpO1xuXG5cbiAgICAkKCcuanNfZ290b19hbmNob3InKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoJCh0aGlzKS5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcCAtIDMwXG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICgkd2luZG93LndpZHRoKCkgPD0gOTkyKXtcbiAgICAgICAgICAgICQoJy5oZWFkZXJfX2hhbWJ1cmdlcicpLnJlbW92ZUNsYXNzKCdoZWFkZXJfX2hhbWJ1cmdlcl9pcy1hY3RpdmVfdHJ1ZScpO1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9fbW9iaWxlJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9fbW9iaWxlX2lzLXN0YXRlX3RydWUnKTtcbiAgICAgICAgICAgICQoJy5tb2JpbGUtbWVudScpLnJlbW92ZUNsYXNzKCdtb2JpbGUtbWVudV9pcy1hY3RpdmVfdHJ1ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vPT09PSDQpNC+0YDQvNCwIFwi0JfQsNC60LDQt9Cw0YLRjCDQt9Cy0L7QvdC+0LpcIlxuICAgICQoJy5qc19jYWxsX2JhY2snKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgdHlwZTogJ2lubGluZScsXG4gICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9ICdtZnAtem9vbS1pbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1pZENsaWNrOiB0cnVlXG4gICAgfSk7XG5cblxuICAgICQoJy5qc19vcGVuX2dhbGxlcnknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN1cnJlbnRHYWxsZXJ5ID0gZ2FsbGVyaWVzWyQodGhpcykuZGF0YSgnZ2FsbGVyeUlkJyldO1xuXG4gICAgICAgICQubWFnbmlmaWNQb3B1cC5vcGVuKHtcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgICAgICBpdGVtczogY3VycmVudEdhbGxlcnksXG4gICAgICAgICAgICB0TG9hZGluZzogJ9CX0LDQs9GA0YPQttCw0LXRgtGB0Y8g0LjQt9C+0LHRgNCw0LbQtdC90LjQtSAjJWN1cnIlLi4uJyxcbiAgICAgICAgICAgIGNsb3NlQnRuSW5zaWRlOiBmYWxzZSxcbiAgICAgICAgICAgIHJlbW92YWxEZWxheTogMzAwLFxuICAgICAgICAgICAgZ2FsbGVyeToge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbmF2aWdhdGVCeUltZ0NsaWNrOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByZWxvYWQ6IFswLDFdLFxuICAgICAgICAgICAgICAgIHRQcmV2OiAn0J/RgNC10LTRi9C00YPRidC10LUnLFxuICAgICAgICAgICAgICAgIHROZXh0OiAn0KHQu9C10LTRg9GO0YnQtdC1JyxcbiAgICAgICAgICAgICAgICB0Q291bnRlcjogJzxzcGFuIGNsYXNzPVwibWZwLWNvdW50ZXJcIj4lY3VyciUg0LjQtyAldG90YWwlPC9zcGFuPidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgICAgIHRFcnJvcjogJzxhIGhyZWY9XCIldXJsJVwiPtCY0LfQvtCx0YDQsNC20LXQvdC40LUgIyVjdXJyJTwvYT4g0L3QtSDRg9C00LDQtdGC0YHRjyDQt9Cw0LPRgNGD0LfQuNGC0YwuJyxcbiAgICAgICAgICAgICAgICB0aXRsZVNyYzogJ3RpdGxlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IGEgaGFjayB0aGF0IGFkZHMgbWZwLWFuaW0gY2xhc3MgdG8gbWFya3VwXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3QuaW1hZ2UubWFya3VwID0gdGhpcy5zdC5pbWFnZS5tYXJrdXAucmVwbGFjZSgnbWZwLWZpZ3VyZScsICdtZnAtZmlndXJlIG1mcC13aXRoLWFuaW0nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdC5nYWxsZXJ5LmFycm93TWFya3VwID0gdGhpcy5zdC5nYWxsZXJ5LmFycm93TWFya3VwLnJlcGxhY2UoJ21mcC1hcnJvdycsICdtZnAtYXJyb3cgbWZwLXdpdGgtYW5pbScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0LmNsb3NlTWFya3VwID0gdGhpcy5zdC5jbG9zZU1hcmt1cC5yZXBsYWNlKCdtZnAtY2xvc2UnLCAnbWZwLWNsb3NlIG1mcC13aXRoLWFuaW0nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSAnbWZwLXpvb20taW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXX0=
