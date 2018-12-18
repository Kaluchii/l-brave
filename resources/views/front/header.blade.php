@section('header')
    <header class="b-header">
        <div class="b-container">
            <a href="schedule.html" class="b-link b-header__logo"></a>
            <ul class="b-header__information">
                <li class="b-header__information-element">Тренировки</li>
                <li class="b-header__information-element">Спарринги</li>
                <li class="b-header__information-element">Развитие</li>
            </ul>
            <ul class="b-header__nav">
                <li class="b-header__item b-header__item_active_yes">
                    <a href="#" class="b-link b-header__link">О клубе</a>
                </li>
                <li class="b-header__item">
                    <a href="#" class="b-link b-header__link">Вызовы</a>
                </li>
                <li class="b-header__item">
                    <a href="#" class="b-link b-header__link">Спарринги</a>
                </li>
                <li class="b-header__item">
                    <a href="#" class="b-link b-header__link">Рейтинг</a>
                </li>
                <li class="b-header__item">
                    <a href="#" class="b-link b-header__link">Принципы</a>
                </li>
                <li class="b-header__item">
                    <a href="#" class="b-link b-header__link">Услуги и цены</a>
                </li>
            </ul>
            <div class="b-header__authorization">
                <a href="#" class="b-link b-header__login">Вход</a>
                <a href="#b-popup-booking-invite" data-effect="mfp-move-horizontal" class="b-link b-inline-popup b-header__registration">Регистрация</a>
            </div>
            <div class="b-header__mobile">
                <button class="b-header__hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="b-mobile-menu">
                    <li class="b-mobile-menu__item">
                        <a href="#" class="b-link b-mobile-menu__link">О клубе</a>
                    </li>
                    <li class="b-mobile-menu__item">
                        <a href="#" class="b-link b-mobile-menu__link">Вызовы</a>
                    </li>
                    <li class="b-mobile-menu__item b-mobile-menu__item_is-active_true">
                        <a href="#" class="b-link b-mobile-menu__link">Спарринги</a>
                    </li>
                    <li class="b-mobile-menu__item">
                        <a href="#" class="b-link b-mobile-menu__link">Рейтинг</a>
                    </li>
                    <li class="b-mobile-menu__item">
                        <a href="#" class="b-link b-mobile-menu__link">Принципы</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
@endsection