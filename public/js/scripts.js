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
    $('.js_thank_link').magnificPopup({
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZvcm0uanMiLCJoZWFkZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFjY29yZGlvbiA9ICQoJy5qc19hY2NvcmRpb24nKTtcbiAgICBpZiAoYWNjb3JkaW9uLmxlbmd0aCkge1xuICAgICAgICB2YXIgdGl0bGUgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9faXRlbS10aXRsZScpO1xuXG4gICAgICAgIHRpdGxlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtLWNvbnRlbnQtd3JhcCcpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKnZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpIC5pbm5lcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGkgLmlubmVyJykuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJCgnLmpzX3RoYW5rX2xpbmsnKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgdHlwZTogJ2lubGluZScsXG4gICAgICAgIHJlbW92YWxEZWxheTogNTAwLFxuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0nbWZwLXpvb20taW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtaWRDbGljazogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICAvLyDQn9GA0LXQtNC+0YLQstGA0LDRidC10L3QuNC1INC+0YLQv9GA0LDQstC60Lgg0YTQvtGA0LzRiyDRh9C10YDQtdC3IHBocCDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQutC90L7Qv9C60YNcbiAgICAkKCdmb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L/QvtGH0YLRiyDQvdCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjQtSDQvNCw0YHQutC1ICpAKi4qXG4gICAgZnVuY3Rpb24gaXNFbWFpbCggbWFpbCApe1xuICAgICAgICB2YXIgcmVnZXggPSAvXFxTK0BcXFMrL2lnbTtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QobWFpbCk7XG4gICAgfVxuXG5cbiAgICAvLyDQntGH0LjRgdGC0LrQsCDRhNC+0YDQvNGLXG4gICAgZnVuY3Rpb24gY2xlYXJGaWVsZHMoIHNlbGVjdG9yICl7XG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKCAkKHRoaXMpLmF0dHIoJ25hbWUnKSAhPT0gJ2Zvcm0nKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygndmFsaWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyDQn9GA0L7QstC10YDQutCwINC+0YLQtNC10LvRjNC90L7Qs9C+INC/0L7Qu9GPINC90LAg0LLQsNC70LjQtNC90L7RgdGC0YxcbiAgICBmdW5jdGlvbiBmaWVsZFZhbGlkKCBpbnB1dCApIHtcblxuICAgICAgICBpZiggaW5wdXQudmFsKCkgIT09ICcnICl7XG5cbiAgICAgICAgICAgIGlmICggaW5wdXQuYXR0cigndHlwZScpID09PSAnZW1haWwnICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzRW1haWwoIGlucHV0LnZhbCgpICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLy8g0JTQvtCx0LDQstC70LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QvtC70Y4g0L/QviDRgNC10LfRg9C70YzRgtCw0YLQsNC8INCy0LDQu9C40LTQsNGG0LjQuFxuICAgIGZ1bmN0aW9uIGZpZWxkQ2hlY2soIGlucHV0ICkge1xuXG4gICAgICAgIHZhciBwYXJlbnQgPSBpbnB1dC5wYXJlbnQoKTtcblxuICAgICAgICBpZiggZmllbGRWYWxpZCggaW5wdXQgKSApe1xuICAgICAgICAgICAgaWYoIHBhcmVudC5oYXNDbGFzcygnZXJyb3InKSApe1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCd2YWxpZCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKCBwYXJlbnQuaGFzQ2xhc3MoJ3ZhbGlkJykgKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ3ZhbGlkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnZXJyb3InKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCgnLmpzX2Zvcm1faW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmllbGRDaGVjayggJCh0aGlzKSApO1xuICAgIH0pO1xuICAgICQoJy5qc19mb3JtX2lucHV0Jykub24oJ2ZvY3Vzb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmaWxsaW5nJyk7XG4gICAgfSk7XG4gICAgJCgnLmpzX2Zvcm1faW5wdXQnKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpbGxpbmcnKTtcbiAgICB9KTtcblxuXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQv9C+0LvQtdC5INGE0L7RgNC80Ysg0L3QsCDQvtGC0YHRg9GC0YHRgtCy0LjQtSDQv9GD0YHRgtGL0YUg0L/QvtC70LXQuSDQuCDQstCw0LvQuNC00L3QvtGB0YLRjFxuICAgIGZ1bmN0aW9uIGZpZWxkc0NoZWNrKCBzZWxlY3RvciApe1xuICAgICAgICB2YXIgY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHZhciBmb2N1cyA9IHRydWU7XG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrZWQgPSBmaWVsZENoZWNrKCAkKHRoaXMpICkgJiYgY2hlY2tlZDtcbiAgICAgICAgICAgIGlmICggZm9jdXMgJiYgIWNoZWNrZWQgKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaGVja2VkO1xuICAgIH1cblxuXG4gICAgLy8g0KHQsdC+0YAg0LTQsNC90L3Ri9GFINGBINGE0L7RgNC80Ysg0Lgg0YTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC+0LHRitC10LrRgtCwXG4gICAgZnVuY3Rpb24gYWRkRmllbGRzKCBzZWxlY3Rvciwgb2JqZWN0ICl7XG5cbiAgICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBvYmplY3RbJHRoaXMuYXR0cignbmFtZScpXSA9ICR0aGlzLnZhbCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhamF4RGF0YVNlbmQodHlwZSwgdXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIHZhciB1bmljYWwsIHNlbmRCdXR0b24sIHNlbGVjdG9yO1xuICAgIHZhciBhY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gZmluYWxWYWxpZGF0aW9uKCkge1xuICAgICAgICBpZiggYWN0aXZlICl7XG4gICAgICAgICAgICBzZW5kQnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHVuaWNhbCA9IHNlbmRCdXR0b24uY2xvc2VzdCgnLmpzX2Zvcm1faWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycrdW5pY2FsKycgLmpzX2Zvcm1faW5wdXQnO1xuXG4gICAgICAgICAgICB2YXIgdmFsaWRGb3JtICA9IGZpZWxkc0NoZWNrKCBzZWxlY3RvciApO1xuXG4gICAgICAgICAgICBpZiAoIHZhbGlkRm9ybSApe1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbmRCdXR0b24uYWRkQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgICAgICBzZW5kRm9ybSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCgnLmpzX3NlbmRfZm9ybScpLm9uKCdjbGljaycsIGZpbmFsVmFsaWRhdGlvbik7XG5cblxuICAgIGZ1bmN0aW9uIHNlbmRGb3JtKCkge1xuXG4gICAgICAgIHZhciBkYXRhb2JqID0ge307XG5cbiAgICAgICAgYWRkRmllbGRzKCBzZWxlY3RvciwgZGF0YW9iaiApO1xuXG4gICAgICAgIHZhciByZXNwb25zZSA9IGFqYXhEYXRhU2VuZCgnUE9TVCcsICcvZmVlZGJhY2svbWFpbCcsIGRhdGFvYmopO1xuICAgICAgICByZXNwb25zZS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoIWRhdGEuZXJyb3Ipe1xuICAgICAgICAgICAgICAgICQoJy5qc190aGFua19saW5rJykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBjbGVhckZpZWxkcyggc2VsZWN0b3IgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXNwb25zZS5lcnJvcihmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgc2VuZEJ1dHRvbi5yZW1vdmVDbGFzcygnbG9hZCcpO1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7IiwiJChmdW5jdGlvbigpIHtcbiAgICAkKCcuaGVhZGVyX19oYW1idXJnZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9faGFtYnVyZ2VyX2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgICQoJy5oZWFkZXJfX21vYmlsZScpLnRvZ2dsZUNsYXNzKCdoZWFkZXJfX21vYmlsZV9pcy1zdGF0ZV90cnVlJyk7XG4gICAgICAgICQoJy5tb2JpbGUtbWVudScpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtbWVudV9pcy1hY3RpdmVfdHJ1ZScpO1xuICAgIH0pO1xufSk7XG4iLCIkKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHdpbmRvdyA9ICQod2luZG93KSxcbiAgICAgICAgY3VycmVudEdhbGxlcnkgPSB7fTtcblxuICAgICQoXCIuanNfcmV2aWV3c19zbGlja1wiKS5zbGljayh7XG4gICAgICAgIGluZmluaXRlOiBmYWxzZSxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgZG90czogdHJ1ZS8qLFxuICAgICAgICBhZGFwdGl2ZUhlaWdodDogdHJ1ZSovXG4gICAgfSk7XG5cblxuICAgICQoJy5zZWxlY3QnKS5zZWxlY3QyKCk7XG5cblxuICAgICQoJy5qc19nb3RvX2FuY2hvcicpLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gMzBcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCR3aW5kb3cud2lkdGgoKSA8PSA5OTIpe1xuICAgICAgICAgICAgJCgnLmhlYWRlcl9faGFtYnVyZ2VyJykucmVtb3ZlQ2xhc3MoJ2hlYWRlcl9faGFtYnVyZ2VyX2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgICAgICAkKCcuaGVhZGVyX19tb2JpbGUnKS5yZW1vdmVDbGFzcygnaGVhZGVyX19tb2JpbGVfaXMtc3RhdGVfdHJ1ZScpO1xuICAgICAgICAgICAgJCgnLm1vYmlsZS1tZW51JykucmVtb3ZlQ2xhc3MoJ21vYmlsZS1tZW51X2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy89PT09INCk0L7RgNC80LAgXCLQl9Cw0LrQsNC30LDRgtGMINC30LLQvtC90L7QulwiXG4gICAgJCgnLmpzX2NhbGxfYmFjaycpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICB0eXBlOiAnaW5saW5lJyxcbiAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0gJ21mcC16b29tLWluJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWlkQ2xpY2s6IHRydWVcbiAgICB9KTtcblxuXG4gICAgJCgnLmpzX29wZW5fZ2FsbGVyeScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY3VycmVudEdhbGxlcnkgPSBnYWxsZXJpZXNbJCh0aGlzKS5kYXRhKCdnYWxsZXJ5SWQnKV07XG5cbiAgICAgICAgJC5tYWduaWZpY1BvcHVwLm9wZW4oe1xuICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBjdXJyZW50R2FsbGVyeSxcbiAgICAgICAgICAgIHRMb2FkaW5nOiAn0JfQsNCz0YDRg9C20LDQtdGC0YHRjyDQuNC30L7QsdGA0LDQttC10L3QuNC1ICMlY3VyciUuLi4nLFxuICAgICAgICAgICAgY2xvc2VCdG5JbnNpZGU6IGZhbHNlLFxuICAgICAgICAgICAgcmVtb3ZhbERlbGF5OiAzMDAsXG4gICAgICAgICAgICBnYWxsZXJ5OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlbG9hZDogWzAsMV0sXG4gICAgICAgICAgICAgICAgdFByZXY6ICfQn9GA0LXQtNGL0LTRg9GJ0LXQtScsXG4gICAgICAgICAgICAgICAgdE5leHQ6ICfQodC70LXQtNGD0Y7RidC10LUnLFxuICAgICAgICAgICAgICAgIHRDb3VudGVyOiAnPHNwYW4gY2xhc3M9XCJtZnAtY291bnRlclwiPiVjdXJyJSDQuNC3ICV0b3RhbCU8L3NwYW4+J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgdEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+0JjQt9C+0LHRgNCw0LbQtdC90LjQtSAjJWN1cnIlPC9hPiDQvdC1INGD0LTQsNC10YLRgdGPINC30LDQs9GA0YPQt9C40YLRjC4nLFxuICAgICAgICAgICAgICAgIHRpdGxlU3JjOiAndGl0bGUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGp1c3QgYSBoYWNrIHRoYXQgYWRkcyBtZnAtYW5pbSBjbGFzcyB0byBtYXJrdXBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdC5pbWFnZS5tYXJrdXAgPSB0aGlzLnN0LmltYWdlLm1hcmt1cC5yZXBsYWNlKCdtZnAtZmlndXJlJywgJ21mcC1maWd1cmUgbWZwLXdpdGgtYW5pbScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0LmdhbGxlcnkuYXJyb3dNYXJrdXAgPSB0aGlzLnN0LmdhbGxlcnkuYXJyb3dNYXJrdXAucmVwbGFjZSgnbWZwLWFycm93JywgJ21mcC1hcnJvdyBtZnAtd2l0aC1hbmltJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3QuY2xvc2VNYXJrdXAgPSB0aGlzLnN0LmNsb3NlTWFya3VwLnJlcGxhY2UoJ21mcC1jbG9zZScsICdtZnAtY2xvc2UgbWZwLXdpdGgtYW5pbScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0Lm1haW5DbGFzcyA9ICdtZnAtem9vbS1pbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pOyJdfQ==
