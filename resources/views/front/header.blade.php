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
                    <a href="#about" class="header__link js_goto_anchor">О клубе</a>
                </li>
                <li class="header__item">
                    <a href="#atmosphere" class="header__link js_goto_anchor">Галерея</a>
                </li>
                <li class="header__item">
                    <a href="#reviews" class="header__link js_goto_anchor">Отзывы</a>
                </li>
                <li class="header__item">
                    <a href="#habit" class="header__link js_goto_anchor">Мотивация</a>
                </li>
                <li class="header__item">
                    <a href="#instagram" class="header__link js_goto_anchor">Инстаграм</a>
                </li>
                <li class="header__item">
                    <a href="#what-prevents" class="header__link js_goto_anchor">Причины</a>
                </li>
                <li class="header__item">
                    <a href="#join-brave" class="header__link js_goto_anchor">Услуги и цены</a>
                </li>
            </ul>
            <div class="header__authorization">
                {{--<a href="#" class="header__login">Вход</a>
                <a href="#popup-booking-invite" data-effect="mfp-move-horizontal" class="button button--small inline-popup header__registration"><span class="button__text">Регистрация</span></a>--}}
            </div>
            <div class="header__mobile">
                <button class="header__hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="mobile-menu">
                    <li class="mobile-menu__item">
                        <a href="#about" class="mobile-menu__link js_goto_anchor">О клубе</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#atmosphere" class="mobile-menu__link js_goto_anchor">Галерея</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#reviews" class="mobile-menu__link js_goto_anchor">Отзывы</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#habit" class="mobile-menu__link js_goto_anchor">Мотивация</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#instagram" class="mobile-menu__link js_goto_anchor">Инстаграм</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#what-prevents" class="mobile-menu__link js_goto_anchor">Причины</a>
                    </li>
                    <li class="mobile-menu__item">
                        <a href="#join-brave" class="mobile-menu__link js_goto_anchor">Услуги и цены</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
@endsection