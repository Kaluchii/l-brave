@section('header')
    <header class="header">
        <div class="container">
            <a href="#" class="header__logo"></a>
            <ul class="header__information">
                <li class="header__information-element">Тренировки</li>
                <li class="header__information-element">Спарринги</li>
                <li class="header__information-element">Развитие</li>
            </ul>
            <ul class="header__nav">
                <li class="header__item header__item_active_yes">
                    <a href="#" class="header__link">О клубе</a>
                </li>
                <li class="header__item">
                    <a href="#" class="header__link">Вызовы</a>
                </li>
                <li class="header__item">
                    <a href="#" class="header__link">Спарринги</a>
                </li>
                <li class="header__item">
                    <a href="#" class="header__link">Рейтинг</a>
                </li>
                <li class="header__item">
                    <a href="#" class="header__link">Принципы</a>
                </li>
                <li class="header__item">
                    <a href="#" class="header__link">Услуги и цены</a>
                </li>
            </ul>
            <div class="header__authorization">
                <a href="#" class="link header__login">Вход</a>
                <a href="#popup-booking-invite" data-effect="mfp-move-horizontal" class="link inline-popup header__registration">Регистрация</a>
            </div>
            <div class="header__mobile">
                <button class="header__hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="mobile-menu">
                    <li class="mobile-menu__item">
                        <a href="#" class="mobile-menu__link">О клубе</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#" class="mobile-menu__link">Вызовы</a>
                    </li>
                    <li class="mobile-menu__item mobile-menu__item_is-active_true">
                        <a href="#" class="mobile-menu__link">Спарринги</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#" class="mobile-menu__link">Рейтинг</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#" class="mobile-menu__link">Принципы</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
@endsection