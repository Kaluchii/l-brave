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
    $('.b-header__hamburger').click(function () {
        $(this).toggleClass('b-header__hamburger_is-active_true');
        $('.b-header__mobile').toggleClass('b-header__mobile_is-state_true');
        $('.b-mobile-menu').toggleClass('b-mobile-menu_is-active_true');
    });
});

$(document).ready(function () {
    $(".js_reviews_slick").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        // adaptiveHeight: true
    });



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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uanMiLCJoZWFkZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKCcudGhhbmsnKS5tYWduaWZpY1BvcHVwKHtcbiAgICAgICAgdHlwZTogJ2lubGluZScsXG4gICAgICAgIHJlbW92YWxEZWxheTogNTAwLFxuICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgIGJlZm9yZU9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3QubWFpbkNsYXNzID0nbWZwLXpvb20taW4nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtaWRDbGljazogdHJ1ZVxuICAgIH0pO1xuXG5cbiAgICAvLyDQn9GA0LXQtNC+0YLQstGA0LDRidC10L3QuNC1INC+0YLQv9GA0LDQstC60Lgg0YTQvtGA0LzRiyDRh9C10YDQtdC3IHBocCDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQutC90L7Qv9C60YNcbiAgICAkKCdmb3JtJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L/QvtGH0YLRiyDQvdCwINGB0L7QvtGC0LLQtdGC0YHRgtCy0LjQtSDQvNCw0YHQutC1ICpAKi4qXG4gICAgZnVuY3Rpb24gaXNFbWFpbCggbWFpbCApe1xuICAgICAgICB2YXIgcmVnZXggPSAvXFxTK0BcXFMrL2lnbTtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QobWFpbCk7XG4gICAgfVxuXG5cbiAgICAvLyDQntGH0LjRgdGC0LrQsCDRhNC+0YDQvNGLXG4gICAgZnVuY3Rpb24gY2xlYXJGaWVsZHMoIHNlbGVjdG9yICl7XG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKCAkKHRoaXMpLmF0dHIoJ25hbWUnKSAhPSAnZm9ybScpe1xuICAgICAgICAgICAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0L7RgtC00LXQu9GM0L3QvtCz0L4g0L/QvtC70Y8g0L3QsCDQstCw0LvQuNC00L3QvtGB0YLRjFxuICAgIGZ1bmN0aW9uIGZpZWxkVmFsaWQoIGlucHV0ICkge1xuXG4gICAgICAgIGlmKCBpbnB1dC52YWwoKSAhPSAnJyApe1xuXG4gICAgICAgICAgICBpZiAoIGlucHV0LmF0dHIoJ3R5cGUnKSA9PSAnZW1haWwnICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzRW1haWwoIGlucHV0LnZhbCgpICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG4gICAgLy8g0JTQvtCx0LDQstC70LXQvdC40LUg0LrQu9Cw0YHRgdC+0LIg0L/QvtC70Y4g0L/QviDRgNC10LfRg9C70YzRgtCw0YLQsNC8INCy0LDQu9C40LTQsNGG0LjQuFxuICAgIGZ1bmN0aW9uIGZpZWxkQ2hlY2soIGlucHV0ICkge1xuXG4gICAgICAgIHZhciBwYXJlbnQgPSBpbnB1dC5wYXJlbnQoKTtcblxuICAgICAgICBpZiggZmllbGRWYWxpZCggaW5wdXQgKSApe1xuICAgICAgICAgICAgaWYoIHBhcmVudC5oYXNDbGFzcygnZXJyb3InKSApe1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnZXJyb3InKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCd2YWxpZCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKCBwYXJlbnQuaGFzQ2xhc3MoJ3ZhbGlkJykgKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ3ZhbGlkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnZXJyb3InKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCgnLmZvcm0taW5wdXQnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmllbGRDaGVjayggJCh0aGlzKSApO1xuICAgIH0pO1xuICAgICQoJy5mb3JtLWlucHV0Jykub24oJ2ZvY3Vzb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmaWxsaW5nJyk7XG4gICAgfSk7XG4gICAgJCgnLmZvcm0taW5wdXQnKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZpbGxpbmcnKTtcbiAgICB9KTtcblxuXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQv9C+0LvQtdC5INGE0L7RgNC80Ysg0L3QsCDQvtGC0YHRg9GC0YHRgtCy0LjQtSDQv9GD0YHRgtGL0YUg0L/QvtC70LXQuSDQuCDQstCw0LvQuNC00L3QvtGB0YLRjFxuICAgIGZ1bmN0aW9uIGZpZWxkc0NoZWNrKCBzZWxlY3RvciApe1xuICAgICAgICB2YXIgY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHZhciBmb2N1cyA9IHRydWU7XG4gICAgICAgICQoc2VsZWN0b3IpLmVhY2goIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNoZWNrZWQgPSBmaWVsZENoZWNrKCAkKHRoaXMpICkgJiYgY2hlY2tlZDtcbiAgICAgICAgICAgIGlmICggZm9jdXMgJiYgIWNoZWNrZWQgKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaGVja2VkO1xuICAgIH1cblxuXG4gICAgLy8g0KHQsdC+0YAg0LTQsNC90L3Ri9GFINGBINGE0L7RgNC80Ysg0Lgg0YTQvtGA0LzQuNGA0L7QstCw0L3QuNC1INC+0LHRitC10LrRgtCwXG4gICAgZnVuY3Rpb24gYWRkRmllbGRzKCBzZWxlY3Rvciwgb2JqZWN0ICl7XG5cbiAgICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBvYmplY3RbJHRoaXMuYXR0cignbmFtZScpXSA9ICR0aGlzLnZhbCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhamF4RGF0YVNlbmQodHlwZSwgdXJsLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB3aW5kb3cub25TdWJtaXRSZUNhcHRjaGEgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHNlbmRCdXR0b24uYWRkQ2xhc3MoJ2xvYWQnKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnQ2FwdGNoYSB0ZXN0IHN0YXJ0Jyk7XG4gICAgICAgIHZhciBjUmVzcG9uc2UgPSB7J2ctcmVjYXB0Y2hhLXJlc3BvbnNlJzogZ3JlY2FwdGNoYS5nZXRSZXNwb25zZSgpfTtcblxuICAgICAgICB2YXIgY2FwY2hhVGVzdCA9IGFqYXhEYXRhU2VuZCgnUE9TVCcsICcvY2FwdGNoYScsIGNSZXNwb25zZSk7XG5cbiAgICAgICAgY2FwY2hhVGVzdC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoIGRhdGEuZXJyb3IgKXtcbiAgICAgICAgICAgICAgICBhbGVydCgn0J/RgNC+0LLQtdGA0LrQsCDQvdC1INC/0YDQvtC50LTQtdC90LAhJyk7XG4gICAgICAgICAgICAgICAgc2VuZEJ1dHRvbi5yZW1vdmVDbGFzcygnbG9hZCcpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ2FwdGNoYVRlc3Qgc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgIHNlbmRGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjYXBjaGFUZXN0LmVycm9yKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgYWxlcnQoJ9Cf0YDQuCDQvtGC0L/RgNCw0LLQutC1INGB0L7QvtCx0YnQtdC90LjRjyDQv9GA0L7QuNC30L7RiNC70LAg0L7RiNC40LHQutCwJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ2FwdGNoYVRlc3QgZXJyb3InKTtcbiAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIHZhciB1bmljYWwsIHNlbmRCdXR0b24sIHNlbGVjdG9yO1xuICAgIHZhciBhY3RpdmUgPSB0cnVlO1xuXG4gICAgZnVuY3Rpb24gZmluYWxWYWxpZGF0aW9uKCkge1xuICAgICAgICBpZiggYWN0aXZlICl7XG4gICAgICAgICAgICBzZW5kQnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHVuaWNhbCA9IHNlbmRCdXR0b24uY2xvc2VzdCgnLmZvcm0taWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgc2VsZWN0b3IgPSAnIycrdW5pY2FsKycgLmZvcm0taW5wdXQnO1xuXG4gICAgICAgICAgICB2YXIgdmFsaWRGb3JtICA9IGZpZWxkc0NoZWNrKCBzZWxlY3RvciApO1xuXG4gICAgICAgICAgICBpZiAoIHZhbGlkRm9ybSApe1xuICAgICAgICAgICAgICAgIGdyZWNhcHRjaGEucmVzZXQoKTtcbiAgICAgICAgICAgICAgICBncmVjYXB0Y2hhLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJy5zZW5kLWZvcm0nKS5vbignY2xpY2snLCBmaW5hbFZhbGlkYXRpb24pO1xuXG5cbiAgICBmdW5jdGlvbiBzZW5kRm9ybSgpIHtcblxuICAgICAgICB2YXIgZGF0YW9iaiA9IHt9O1xuXG4gICAgICAgIGFkZEZpZWxkcyggc2VsZWN0b3IsIGRhdGFvYmogKTtcblxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBhamF4RGF0YVNlbmQoJ1BPU1QnLCAnL2ZlZWRiYWNrL21haWwnLCBkYXRhb2JqKTtcbiAgICAgICAgcmVzcG9uc2Uuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGlmKCFkYXRhLmVycm9yKXtcbiAgICAgICAgICAgICAgICAkKCcudGhhbmsnKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIGNsZWFyRmllbGRzKCBzZWxlY3RvciApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VuZEJ1dHRvbi5yZW1vdmVDbGFzcygnbG9hZCcpO1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3BvbnNlLmVycm9yKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBzZW5kQnV0dG9uLnJlbW92ZUNsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG59KTsiLCIkKGZ1bmN0aW9uKCkge1xuICAgICQoJy5iLWhlYWRlcl9faGFtYnVyZ2VyJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdiLWhlYWRlcl9faGFtYnVyZ2VyX2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgICAgICQoJy5iLWhlYWRlcl9fbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ2ItaGVhZGVyX19tb2JpbGVfaXMtc3RhdGVfdHJ1ZScpO1xuICAgICAgICAkKCcuYi1tb2JpbGUtbWVudScpLnRvZ2dsZUNsYXNzKCdiLW1vYmlsZS1tZW51X2lzLWFjdGl2ZV90cnVlJyk7XG4gICAgfSk7XG59KTtcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiLmpzX3Jldmlld3Nfc2xpY2tcIikuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIGRvdHM6IHRydWUsXG4gICAgICAgIC8vIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSk7XG5cblxuXG4gICAgdmFyIGFjY29yZGlvbiA9ICQoJy5qc19hY2NvcmRpb24nKTtcbiAgICBpZiAoYWNjb3JkaW9uLmxlbmd0aCkge1xuICAgICAgICB2YXIgdGl0bGUgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9faXRlbS10aXRsZScpO1xuXG4gICAgICAgIHRpdGxlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtLWNvbnRlbnQtd3JhcCcpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKnZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpIC5pbm5lcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGkgLmlubmVyJykuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyJdfQ==
