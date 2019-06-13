<div class="popup mfp-with-anim mfp-hide js_form_id" id="call_back_form">
    <div class="popup__top-cover"></div>
    <div class="popup__bottom-cover"></div>
    <h4 class="popup__title">Записаться</h4>
    <div class="popup__form feedback-form">
        {{--Передача Названия формы--}}
        <input type="hidden" name="form" class="js_form_input" value="call_back_form">

        <div class="feedback-form__input-wrap">
            <label for="call_back_name" class="feedback-form__input-label">Ваше имя</label>
            <div class="feedback-form__validation-wrap feedback-input">
                <input type="text" name="client_name" id="call_back_name" required class="feedback-input__field js_form_input">
                <div class="feedback-input__tooltip-wrap"><p class="feedback-input__tooltip">Как к вам обращаться</p></div>
            </div>
        </div>

        <div class="feedback-form__input-wrap">
            <label for="call_back_email" class="feedback-form__input-label">Ваша эл.почта</label>
            <div class="feedback-form__validation-wrap feedback-input">
                <input type="email" class="feedback-input__field js_form_input" id="call_back_email" name="email">
                <div class="feedback-input__tooltip-wrap"><p class="feedback-input__tooltip">Электронный адрес нужен для получения уведомлений</p></div>
            </div>
        </div>

        <div class="feedback-form__input-wrap">
            <label for="call_back_phone" class="feedback-form__input-label">Ваш телефон</label>
            <div class="feedback-form__validation-wrap feedback-input">
                <input type="tel" data-require="true" placeholder="+7 (___) ___-__-__" id="call_back_phone" class="feedback-input__field js_form_input" maxlength="25" data-mask="+7 (000) 000-00-00" name="phone">
                <div class="feedback-input__tooltip-wrap"><p class="feedback-input__tooltip">Телефонный номер для связи</p></div>
            </div>
        </div>

        <div class="feedback-form__input-wrap feedback-form__input-wrap--btn">
            <input type="submit" value="ОТПРАВИТЬ" class="feedback-form__btn button button--orange js_send_form">
        </div>
    </div>
</div>