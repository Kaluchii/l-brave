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
            if( $(this).attr('name') != 'form'){
                $(this).val('');
                $(this).parent().removeClass('valid');
            }
        });
    }


    // Проверка отдельного поля на валидность
    function fieldValid( input ) {

        if( input.val() != '' ){

            if ( input.attr('type') == 'email' ){
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

    $('.form-input').on('change', function () {
        return fieldCheck( $(this) );
    });
    $('.form-input').on('focusout', function () {
        $(this).parent().removeClass('filling');
    });
    $('.form-input').on('input', function () {
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

    window.onSubmitReCaptcha = function (token) {
        active = false;
        sendButton.addClass('load');

        console.log('Captcha test start');
        var cResponse = {'g-recaptcha-response': grecaptcha.getResponse()};

        var capchaTest = ajaxDataSend('POST', '/captcha', cResponse);

        capchaTest.success(function(data){
            if( data.error ){
                alert('Проверка не пройдена!');
                sendButton.removeClass('load');
                active = true;
            }else{
                console.log('CaptchaTest success');
                sendForm();
            }
        });
        capchaTest.error(function(data){
            alert('При отправке сообщения произошла ошибка');
            console.log('CaptchaTest error');
            sendButton.removeClass('load');
            active = true;
        });
    };


    var unical, sendButton, selector;
    var active = true;

    function finalValidation() {
        if( active ){
            sendButton = $(this);
            unical = sendButton.closest('.form-id').attr('id');
            selector = '#'+unical+' .form-input';

            var validForm  = fieldsCheck( selector );

            if ( validForm ){
                grecaptcha.reset();
                grecaptcha.execute();
            }
        }
    }

    $('.send-form').on('click', finalValidation);


    function sendForm() {

        var dataobj = {};

        addFields( selector, dataobj );

        var response = ajaxDataSend('POST', '/feedback/mail', dataobj);
        response.success(function(data){
            if(!data.error){
                $('.thank').click();
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


    $('.js_open_gallery').on('click', function () {
        currentGallery = galleries[$(this).data('galleryId')];

        $.magnificPopup.open({
            type: 'image',
            items: currentGallery,
            tLoading: 'Загружается изображение #%curr%...',
            closeBtnInside: true,
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
                    this.st.mainClass = 'mfp-zoom-in';
                }
            }
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZvcm0uanMiLCJoZWFkZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFjY29yZGlvbiA9ICQoJy5qc19hY2NvcmRpb24nKTtcbiAgICBpZiAoYWNjb3JkaW9uLmxlbmd0aCkge1xuICAgICAgICB2YXIgdGl0bGUgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9faXRlbS10aXRsZScpO1xuXG4gICAgICAgIHRpdGxlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtLWNvbnRlbnQtd3JhcCcpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKnZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpIC5pbm5lcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGkgLmlubmVyJykuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJCgnLnRoYW5rJykubWFnbmlmaWNQb3B1cCh7XG4gICAgICAgIHR5cGU6ICdpbmxpbmUnLFxuICAgICAgICByZW1vdmFsRGVsYXk6IDUwMCxcbiAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9J21mcC16b29tLWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWlkQ2xpY2s6IHRydWVcbiAgICB9KTtcblxuXG4gICAgLy8g0J/RgNC10LTQvtGC0LLRgNCw0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0YfQtdGA0LXQtyBwaHAg0L/RgNC4INC90LDQttCw0YLQuNC4INC90LAg0LrQvdC+0L/QutGDXG4gICAgJCgnZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICAvLyDQn9GA0L7QstC10YDQutCwINC/0L7Rh9GC0Ysg0L3QsCDRgdC+0L7RgtCy0LXRgtGB0YLQstC40LUg0LzQsNGB0LrQtSAqQCouKlxuICAgIGZ1bmN0aW9uIGlzRW1haWwoIG1haWwgKXtcbiAgICAgICAgdmFyIHJlZ2V4ID0gL1xcUytAXFxTKy9pZ207XG4gICAgICAgIHJldHVybiByZWdleC50ZXN0KG1haWwpO1xuICAgIH1cblxuXG4gICAgLy8g0J7Rh9C40YHRgtC60LAg0YTQvtGA0LzRi1xuICAgIGZ1bmN0aW9uIGNsZWFyRmllbGRzKCBzZWxlY3RvciApe1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiggJCh0aGlzKS5hdHRyKCduYW1lJykgIT0gJ2Zvcm0nKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygndmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyDQn9GA0L7QstC10YDQutCwINC+0YLQtNC10LvRjNC90L7Qs9C+INC/0L7Qu9GPINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICBmdW5jdGlvbiBmaWVsZFZhbGlkKCBpbnB1dCApIHtcblxuICAgICAgICBpZiggaW5wdXQudmFsKCkgIT0gJycgKXtcblxuICAgICAgICAgICAgaWYgKCBpbnB1dC5hdHRyKCd0eXBlJykgPT0gJ2VtYWlsJyApe1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0VtYWlsKCBpbnB1dC52YWwoKSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1INC60LvQsNGB0YHQvtCyINC/0L7Qu9GOINC/0L4g0YDQtdC30YPQu9GM0YLQsNGC0LDQvCDQstCw0LvQuNC00LDRhtC40LhcbiAgICBmdW5jdGlvbiBmaWVsZENoZWNrKCBpbnB1dCApIHtcblxuICAgICAgICB2YXIgcGFyZW50ID0gaW5wdXQucGFyZW50KCk7XG5cbiAgICAgICAgaWYoIGZpZWxkVmFsaWQoIGlucHV0ICkgKXtcbiAgICAgICAgICAgIGlmKCBwYXJlbnQuaGFzQ2xhc3MoJ2Vycm9yJykgKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ2Vycm9yJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygndmFsaWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiggcGFyZW50Lmhhc0NsYXNzKCd2YWxpZCcpICl7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCd2YWxpZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5mb3JtLWlucHV0Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkQ2hlY2soICQodGhpcykgKTtcbiAgICB9KTtcbiAgICAkKCcuZm9ybS1pbnB1dCcpLm9uKCdmb2N1c291dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZmlsbGluZycpO1xuICAgIH0pO1xuICAgICQoJy5mb3JtLWlucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmaWxsaW5nJyk7XG4gICAgfSk7XG5cblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L/QvtC70LXQuSDRhNC+0YDQvNGLINC90LAg0L7RgtGB0YPRgtGB0YLQstC40LUg0L/Rg9GB0YLRi9GFINC/0L7Qu9C10Lkg0Lgg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICBmdW5jdGlvbiBmaWVsZHNDaGVjayggc2VsZWN0b3IgKXtcbiAgICAgICAgdmFyIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB2YXIgZm9jdXMgPSB0cnVlO1xuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjaGVja2VkID0gZmllbGRDaGVjayggJCh0aGlzKSApICYmIGNoZWNrZWQ7XG4gICAgICAgICAgICBpZiAoIGZvY3VzICYmICFjaGVja2VkICl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hlY2tlZDtcbiAgICB9XG5cblxuICAgIC8vINCh0LHQvtGAINC00LDQvdC90YvRhSDRgSDRhNC+0YDQvNGLINC4INGE0L7RgNC80LjRgNC+0LLQsNC90LjQtSDQvtCx0YrQtdC60YLQsFxuICAgIGZ1bmN0aW9uIGFkZEZpZWxkcyggc2VsZWN0b3IsIG9iamVjdCApe1xuXG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgb2JqZWN0WyR0aGlzLmF0dHIoJ25hbWUnKV0gPSAkdGhpcy52YWwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWpheERhdGFTZW5kKHR5cGUsIHVybCwgZGF0YSkge1xuICAgICAgICByZXR1cm4gJC5hamF4KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgd2luZG93Lm9uU3VibWl0UmVDYXB0Y2hhID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBzZW5kQnV0dG9uLmFkZENsYXNzKCdsb2FkJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0NhcHRjaGEgdGVzdCBzdGFydCcpO1xuICAgICAgICB2YXIgY1Jlc3BvbnNlID0geydnLXJlY2FwdGNoYS1yZXNwb25zZSc6IGdyZWNhcHRjaGEuZ2V0UmVzcG9uc2UoKX07XG5cbiAgICAgICAgdmFyIGNhcGNoYVRlc3QgPSBhamF4RGF0YVNlbmQoJ1BPU1QnLCAnL2NhcHRjaGEnLCBjUmVzcG9uc2UpO1xuXG4gICAgICAgIGNhcGNoYVRlc3Quc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGlmKCBkYXRhLmVycm9yICl7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ9Cf0YDQvtCy0LXRgNC60LAg0L3QtSDQv9GA0L7QudC00LXQvdCwIScpO1xuICAgICAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhcHRjaGFUZXN0IHN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICBzZW5kRm9ybSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2FwY2hhVGVzdC5lcnJvcihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGFsZXJ0KCfQn9GA0Lgg0L7RgtC/0YDQsNCy0LrQtSDRgdC+0L7QsdGJ0LXQvdC40Y8g0L/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NhcHRjaGFUZXN0IGVycm9yJyk7XG4gICAgICAgICAgICBzZW5kQnV0dG9uLnJlbW92ZUNsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICB2YXIgdW5pY2FsLCBzZW5kQnV0dG9uLCBzZWxlY3RvcjtcbiAgICB2YXIgYWN0aXZlID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIGZpbmFsVmFsaWRhdGlvbigpIHtcbiAgICAgICAgaWYoIGFjdGl2ZSApe1xuICAgICAgICAgICAgc2VuZEJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgICAgICB1bmljYWwgPSBzZW5kQnV0dG9uLmNsb3Nlc3QoJy5mb3JtLWlkJykuYXR0cignaWQnKTtcbiAgICAgICAgICAgIHNlbGVjdG9yID0gJyMnK3VuaWNhbCsnIC5mb3JtLWlucHV0JztcblxuICAgICAgICAgICAgdmFyIHZhbGlkRm9ybSAgPSBmaWVsZHNDaGVjayggc2VsZWN0b3IgKTtcblxuICAgICAgICAgICAgaWYgKCB2YWxpZEZvcm0gKXtcbiAgICAgICAgICAgICAgICBncmVjYXB0Y2hhLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgZ3JlY2FwdGNoYS5leGVjdXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKCcuc2VuZC1mb3JtJykub24oJ2NsaWNrJywgZmluYWxWYWxpZGF0aW9uKTtcblxuXG4gICAgZnVuY3Rpb24gc2VuZEZvcm0oKSB7XG5cbiAgICAgICAgdmFyIGRhdGFvYmogPSB7fTtcblxuICAgICAgICBhZGRGaWVsZHMoIHNlbGVjdG9yLCBkYXRhb2JqICk7XG5cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gYWpheERhdGFTZW5kKCdQT1NUJywgJy9mZWVkYmFjay9tYWlsJywgZGF0YW9iaik7XG4gICAgICAgIHJlc3BvbnNlLnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBpZighZGF0YS5lcnJvcil7XG4gICAgICAgICAgICAgICAgJCgnLnRoYW5rJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBjbGVhckZpZWxkcyggc2VsZWN0b3IgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXNwb25zZS5lcnJvcihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgc2VuZEJ1dHRvbi5yZW1vdmVDbGFzcygnbG9hZCcpO1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7IiwiJChmdW5jdGlvbigpIHtcbiAgICAkKCcuaGVhZGVyX19oYW1idXJnZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGFtYnVyZ2VyX2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX21vYmlsZScpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21vYmlsZV9pcy1zdGF0ZV90cnVlJyk7XG4gICAgICAgICQoJy5tb2JpbGUtbWVudScpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbWVudV9pcy1hY3RpdmVfdHJ1ZScpO1xuICAgIH0pO1xufSk7XG4iLCIkKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICAgICAgY3VycmVudEdhbGxlcnkgPSB7fTtcblxuICAgICQoXCIuanNfcmV2aWV3c19zbGlja1wiKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgZG90czogdHJ1ZS8qLFxuICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSovXG4gICAgfSk7XG5cblxuICAgICQoJy5zZWxlY3QnKS5zZWxlY3QyKCk7XG5cblxuICAgICQoJy5qc19nb3RvX2FuY2hvcicpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gMzBcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA5OTIpe1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9faGFtYnVyZ2VyX2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tb2JpbGUnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19tb2JpbGVfaXMtc3RhdGVfdHJ1ZScpO1xuICAgICAgICAgICAgJCgnLm1vYmlsZS1tZW51JykucmVtb3ZlQ2xhc3MoJ21vYmlsZS1tZW51X2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgJCgnLmpzX29wZW5fZ2FsbGVyeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudEdhbGxlcnkgPSBnYWxsZXJpZXNbJCh0aGlzKS5kYXRhKCdnYWxsZXJ5SWQnKV07XG5cbiAgICAgICAgJC5tYWduaWZpY1BvcHVwLm9wZW4oe1xuICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBjdXJyZW50R2FsbGVyeSxcbiAgICAgICAgICAgIHRMb2FkaW5nOiAn0JfQsNCz0YDRg9C20LDQtdGC0YHRjyDQuNC30L7QsdGA0LDQttC10L3QuNC1ICMlY3VyciUuLi4nLFxuICAgICAgICAgICAgY2xvc2VCdG5JbnNpZGU6IHRydWUsXG4gICAgICAgICAgICByZW1vdmFsRGVsYXk6IDMwMCxcbiAgICAgICAgICAgIGdhbGxlcnk6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRlQnlJbWdDbGljazogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVsb2FkOiBbMCwxXSxcbiAgICAgICAgICAgICAgICB0UHJldjogJ9Cf0YDQtdC00YvQtNGD0YnQtdC1JyxcbiAgICAgICAgICAgICAgICB0TmV4dDogJ9Ch0LvQtdC00YPRjtGJ0LXQtScsXG4gICAgICAgICAgICAgICAgdENvdW50ZXI6ICc8c3BhbiBjbGFzcz1cIm1mcC1jb3VudGVyXCI+JWN1cnIlINC40LcgJXRvdGFsJTwvc3Bhbj4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgICAgICB0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj7QmNC30L7QsdGA0LDQttC10L3QuNC1ICMlY3VyciU8L2E+INC90LUg0YPQtNCw0LXRgtGB0Y8g0LfQsNCz0YDRg9C30LjRgtGMLicsXG4gICAgICAgICAgICAgICAgdGl0bGVTcmM6ICd0aXRsZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgICAgICBiZWZvcmVPcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBhIGhhY2sgdGhhdCBhZGRzIG1mcC1hbmltIGNsYXNzIHRvIG1hcmt1cFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0LmltYWdlLm1hcmt1cCA9IHRoaXMuc3QuaW1hZ2UubWFya3VwLnJlcGxhY2UoJ21mcC1maWd1cmUnLCAnbWZwLWZpZ3VyZSBtZnAtd2l0aC1hbmltJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3QuZ2FsbGVyeS5hcnJvd01hcmt1cCA9IHRoaXMuc3QuZ2FsbGVyeS5hcnJvd01hcmt1cC5yZXBsYWNlKCdtZnAtYXJyb3cnLCAnbWZwLWFycm93IG1mcC13aXRoLWFuaW0nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSAnbWZwLXpvb20taW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTsiXX0=
