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

$(function () {
    $(".js_reviews_slick").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        // adaptiveHeight: true
    });

    $('.select').select2();


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcm0uanMiLCJoZWFkZXIuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoJy50aGFuaycpLm1hZ25pZmljUG9wdXAoe1xuICAgICAgICB0eXBlOiAnaW5saW5lJyxcbiAgICAgICAgcmVtb3ZhbERlbGF5OiA1MDAsXG4gICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgYmVmb3JlT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdC5tYWluQ2xhc3MgPSdtZnAtem9vbS1pbic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1pZENsaWNrOiB0cnVlXG4gICAgfSk7XG5cblxuICAgIC8vINCf0YDQtdC00L7RgtCy0YDQsNGJ0LXQvdC40LUg0L7RgtC/0YDQsNCy0LrQuCDRhNC+0YDQvNGLINGH0LXRgNC10LcgcGhwINC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQvdCwINC60L3QvtC/0LrRg1xuICAgICQoJ2Zvcm0nKS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQv9C+0YfRgtGLINC90LAg0YHQvtC+0YLQstC10YLRgdGC0LLQuNC1INC80LDRgdC60LUgKkAqLipcbiAgICBmdW5jdGlvbiBpc0VtYWlsKCBtYWlsICl7XG4gICAgICAgIHZhciByZWdleCA9IC9cXFMrQFxcUysvaWdtO1xuICAgICAgICByZXR1cm4gcmVnZXgudGVzdChtYWlsKTtcbiAgICB9XG5cblxuICAgIC8vINCe0YfQuNGB0YLQutCwINGE0L7RgNC80YtcbiAgICBmdW5jdGlvbiBjbGVhckZpZWxkcyggc2VsZWN0b3IgKXtcbiAgICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYoICQodGhpcykuYXR0cignbmFtZScpICE9ICdmb3JtJyl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3ZhbGlkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLy8g0J/RgNC+0LLQtdGA0LrQsCDQvtGC0LTQtdC70YzQvdC+0LPQviDQv9C+0LvRjyDQvdCwINCy0LDQu9C40LTQvdC+0YHRgtGMXG4gICAgZnVuY3Rpb24gZmllbGRWYWxpZCggaW5wdXQgKSB7XG5cbiAgICAgICAgaWYoIGlucHV0LnZhbCgpICE9ICcnICl7XG5cbiAgICAgICAgICAgIGlmICggaW5wdXQuYXR0cigndHlwZScpID09ICdlbWFpbCcgKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNFbWFpbCggaW5wdXQudmFsKCkgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvLyDQlNC+0LHQsNCy0LvQtdC90LjQtSDQutC70LDRgdGB0L7QsiDQv9C+0LvRjiDQv9C+INGA0LXQt9GD0LvRjNGC0LDRgtCw0Lwg0LLQsNC70LjQtNCw0YbQuNC4XG4gICAgZnVuY3Rpb24gZmllbGRDaGVjayggaW5wdXQgKSB7XG5cbiAgICAgICAgdmFyIHBhcmVudCA9IGlucHV0LnBhcmVudCgpO1xuXG4gICAgICAgIGlmKCBmaWVsZFZhbGlkKCBpbnB1dCApICl7XG4gICAgICAgICAgICBpZiggcGFyZW50Lmhhc0NsYXNzKCdlcnJvcicpICl7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdlcnJvcicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ3ZhbGlkJyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoIHBhcmVudC5oYXNDbGFzcygndmFsaWQnKSApe1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygndmFsaWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCdlcnJvcicpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkKCcuZm9ybS1pbnB1dCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmaWVsZENoZWNrKCAkKHRoaXMpICk7XG4gICAgfSk7XG4gICAgJCgnLmZvcm0taW5wdXQnKS5vbignZm9jdXNvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZpbGxpbmcnKTtcbiAgICB9KTtcbiAgICAkKCcuZm9ybS1pbnB1dCcpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZmlsbGluZycpO1xuICAgIH0pO1xuXG5cbiAgICAvLyDQn9GA0L7QstC10YDQutCwINC/0L7Qu9C10Lkg0YTQvtGA0LzRiyDQvdCwINC+0YLRgdGD0YLRgdGC0LLQuNC1INC/0YPRgdGC0YvRhSDQv9C+0LvQtdC5INC4INCy0LDQu9C40LTQvdC+0YHRgtGMXG4gICAgZnVuY3Rpb24gZmllbGRzQ2hlY2soIHNlbGVjdG9yICl7XG4gICAgICAgIHZhciBjaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGZvY3VzID0gdHJ1ZTtcbiAgICAgICAgJChzZWxlY3RvcikuZWFjaCggZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2hlY2tlZCA9IGZpZWxkQ2hlY2soICQodGhpcykgKSAmJiBjaGVja2VkO1xuICAgICAgICAgICAgaWYgKCBmb2N1cyAmJiAhY2hlY2tlZCApe1xuICAgICAgICAgICAgICAgICQodGhpcykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBmb2N1cyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoZWNrZWQ7XG4gICAgfVxuXG5cbiAgICAvLyDQodCx0L7RgCDQtNCw0L3QvdGL0YUg0YEg0YTQvtGA0LzRiyDQuCDRhNC+0YDQvNC40YDQvtCy0LDQvdC40LUg0L7QsdGK0LXQutGC0LBcbiAgICBmdW5jdGlvbiBhZGRGaWVsZHMoIHNlbGVjdG9yLCBvYmplY3QgKXtcblxuICAgICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIG9iamVjdFskdGhpcy5hdHRyKCduYW1lJyldID0gJHRoaXMudmFsKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFqYXhEYXRhU2VuZCh0eXBlLCB1cmwsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuICQuYWpheChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdYLUNTUkYtVE9LRU4nOiAkKCdtZXRhW25hbWU9XCJjc3JmLXRva2VuXCJdJykuYXR0cignY29udGVudCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHdpbmRvdy5vblN1Ym1pdFJlQ2FwdGNoYSA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICBhY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgc2VuZEJ1dHRvbi5hZGRDbGFzcygnbG9hZCcpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdDYXB0Y2hhIHRlc3Qgc3RhcnQnKTtcbiAgICAgICAgdmFyIGNSZXNwb25zZSA9IHsnZy1yZWNhcHRjaGEtcmVzcG9uc2UnOiBncmVjYXB0Y2hhLmdldFJlc3BvbnNlKCl9O1xuXG4gICAgICAgIHZhciBjYXBjaGFUZXN0ID0gYWpheERhdGFTZW5kKCdQT1NUJywgJy9jYXB0Y2hhJywgY1Jlc3BvbnNlKTtcblxuICAgICAgICBjYXBjaGFUZXN0LnN1Y2Nlc3MoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBpZiggZGF0YS5lcnJvciApe1xuICAgICAgICAgICAgICAgIGFsZXJ0KCfQn9GA0L7QstC10YDQutCwINC90LUg0L/RgNC+0LnQtNC10L3QsCEnKTtcbiAgICAgICAgICAgICAgICBzZW5kQnV0dG9uLnJlbW92ZUNsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYXB0Y2hhVGVzdCBzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgc2VuZEZvcm0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNhcGNoYVRlc3QuZXJyb3IoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBhbGVydCgn0J/RgNC4INC+0YLQv9GA0LDQstC60LUg0YHQvtC+0LHRidC10L3QuNGPINC/0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDYXB0Y2hhVGVzdCBlcnJvcicpO1xuICAgICAgICAgICAgc2VuZEJ1dHRvbi5yZW1vdmVDbGFzcygnbG9hZCcpO1xuICAgICAgICAgICAgYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgdmFyIHVuaWNhbCwgc2VuZEJ1dHRvbiwgc2VsZWN0b3I7XG4gICAgdmFyIGFjdGl2ZSA9IHRydWU7XG5cbiAgICBmdW5jdGlvbiBmaW5hbFZhbGlkYXRpb24oKSB7XG4gICAgICAgIGlmKCBhY3RpdmUgKXtcbiAgICAgICAgICAgIHNlbmRCdXR0b24gPSAkKHRoaXMpO1xuICAgICAgICAgICAgdW5pY2FsID0gc2VuZEJ1dHRvbi5jbG9zZXN0KCcuZm9ybS1pZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgICBzZWxlY3RvciA9ICcjJyt1bmljYWwrJyAuZm9ybS1pbnB1dCc7XG5cbiAgICAgICAgICAgIHZhciB2YWxpZEZvcm0gID0gZmllbGRzQ2hlY2soIHNlbGVjdG9yICk7XG5cbiAgICAgICAgICAgIGlmICggdmFsaWRGb3JtICl7XG4gICAgICAgICAgICAgICAgZ3JlY2FwdGNoYS5yZXNldCgpO1xuICAgICAgICAgICAgICAgIGdyZWNhcHRjaGEuZXhlY3V0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCgnLnNlbmQtZm9ybScpLm9uKCdjbGljaycsIGZpbmFsVmFsaWRhdGlvbik7XG5cblxuICAgIGZ1bmN0aW9uIHNlbmRGb3JtKCkge1xuXG4gICAgICAgIHZhciBkYXRhb2JqID0ge307XG5cbiAgICAgICAgYWRkRmllbGRzKCBzZWxlY3RvciwgZGF0YW9iaiApO1xuXG4gICAgICAgIHZhciByZXNwb25zZSA9IGFqYXhEYXRhU2VuZCgnUE9TVCcsICcvZmVlZGJhY2svbWFpbCcsIGRhdGFvYmopO1xuICAgICAgICByZXNwb25zZS5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoIWRhdGEuZXJyb3Ipe1xuICAgICAgICAgICAgICAgICQoJy50aGFuaycpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJGaWVsZHMoIHNlbGVjdG9yICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZW5kQnV0dG9uLnJlbW92ZUNsYXNzKCdsb2FkJyk7XG4gICAgICAgICAgICBhY3RpdmUgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzcG9uc2UuZXJyb3IoZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIHNlbmRCdXR0b24ucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcbiAgICAgICAgICAgIGFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIiQoZnVuY3Rpb24oKSB7XG4gICAgJCgnLmItaGVhZGVyX19oYW1idXJnZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2ItaGVhZGVyX19oYW1idXJnZXJfaXMtYWN0aXZlX3RydWUnKTtcbiAgICAgICAgJCgnLmItaGVhZGVyX19tb2JpbGUnKS50b2dnbGVDbGFzcygnYi1oZWFkZXJfX21vYmlsZV9pcy1zdGF0ZV90cnVlJyk7XG4gICAgICAgICQoJy5iLW1vYmlsZS1tZW51JykudG9nZ2xlQ2xhc3MoJ2ItbW9iaWxlLW1lbnVfaXMtYWN0aXZlX3RydWUnKTtcbiAgICB9KTtcbn0pO1xuIiwiJChmdW5jdGlvbiAoKSB7XG4gICAgJChcIi5qc19yZXZpZXdzX3NsaWNrXCIpLnNsaWNrKHtcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAvLyBhZGFwdGl2ZUhlaWdodDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgJCgnLnNlbGVjdCcpLnNlbGVjdDIoKTtcblxuXG4gICAgdmFyIGFjY29yZGlvbiA9ICQoJy5qc19hY2NvcmRpb24nKTtcbiAgICBpZiAoYWNjb3JkaW9uLmxlbmd0aCkge1xuICAgICAgICB2YXIgdGl0bGUgPSBhY2NvcmRpb24uZmluZCgnLmFjY29yZGlvbl9faXRlbS10aXRsZScpO1xuXG4gICAgICAgIHRpdGxlLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5wYXJlbnQoKS5oYXNDbGFzcygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5uZXh0KCkuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtJykucmVtb3ZlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuYWNjb3JkaW9uX19pdGVtLWNvbnRlbnQtd3JhcCcpLnNsaWRlVXAoMzUwKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS50b2dnbGVDbGFzcygnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKnZhciAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICgkdGhpcy5uZXh0KCkuaGFzQ2xhc3MoJ3Nob3cnKSkge1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVVwKDM1MCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xpIC5pbm5lcicpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGkgLmlubmVyJykuc2xpZGVVcCgzNTApO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS50b2dnbGVDbGFzcygnc2hvdycpO1xuICAgICAgICAgICAgICAgICR0aGlzLm5leHQoKS5zbGlkZVRvZ2dsZSgzNTApO1xuICAgICAgICAgICAgfSovXG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyJdfQ==
