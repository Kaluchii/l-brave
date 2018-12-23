@extends('front.layout')
@section('content')
    @include('front.index.meta')

    <div class="main-page">

        <section class="main-page__title-block title-block">
            <div class="title-block__title-wrap">
                <h1 class="title-block__title">Любительские<br>спарринги</h1>
                в&nbsp;<div class="title-block__select-wrap">
                    <select name="in-city" id="in-city" class="title-block__select select">
                        <option value="">Талдыкоргане</option>
                        <option value="">Алматы</option>
                        <option value="">Туркестане</option>
                        <option value="">Очень длинное название</option>
                    </select>
                </div>
            </div>
            <div class="title-block__objectives">
                <span class="title-block__objectives-item">Спарринги</span>
                <span class="title-block__objectives-item">Тренировки</span>
                <span class="title-block__objectives-item">Самореализация</span>
            </div>
            <div class="title-block__mans">
                <div class="title-block__mans-item">
                    <div class="title-block__man-name">Алтынбек Байтуров</div>
                    <div class="title-block__man-occupation">Предпринематель</div>
                    <div class="title-block__man-info">32 года ∙ 72 кг ∙ 180 см</div>
                </div>
                <div class="title-block__mans-item">
                    <div class="title-block__man-name">Федор Овчинников</div>
                    <div class="title-block__man-occupation">Дизайнер</div>
                    <div class="title-block__man-info">32 года ∙ 72 кг ∙ 180 см</div>
                </div>
            </div>
        </section>


        <section class="main-page__about about">
            <div class="about__header main-info">
                <h2 class="main-info__title title-l1">Что такое Brave</h2>
                <p class="main-info__text">Мы создали Brave, чтобы становиться сильней, умней и решительней.
                    Это мужское сообщество, где вы совместите спарринги, тренировки, работу в команде и личностный рост.
                </p>
            </div>
            <div class="about__body">
                <div class="about__img-wrap">
                    <img src="/img/about_img.jpg" alt="" class="about__img">
                </div>
                <div class="about__info-col">
                    <div class="about__text-wrap text-blocks">
                        <p class="text-blocks__item">В основе Brave лежат физические тренировки и спарринги, упражнения
                            для развития уверенности, дисциплины и целеустремленности.
                        </p>
                        <p class="text-blocks__item">Мужчина должен быть готов защитить семью, помочь слабому и
                            показать своим примером то, чему хотим учить детей. Мужчина — это сила и характер.
                            Его мы и стремимся развивать.
                        </p>
                    </div>
                    <div class="about__free-exercise free-exercise">
                        <p class="free-exercise__title title-l3">Бесплатная тренировка</p>
                        <p class="free-exercise__text">Сделайте первый шаг и запишитесь на бесплатную ознакомительную
                            тренировку для начинающих.
                        </p>
                        <div class="free-exercise__btn-with-text">
                            <div class="free-exercise__btn-wrap">
                                <a href="#" class="free-exercise__btn button"><span class="button__text">ЗАПИСАТЬСЯ</span></a>
                            </div>
                            <p class="free-exercise__text-near-button">Тренировка по физподготовке
                                и&nbsp;основам самозащиты
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section class="main-page__atmosphere atmosphere">
            <div class="atmosphere__header main-info main-info--white">
                <h3 class="main-info__title title-l1">Атмосфера</h3>
                <p class="main-info__text">Вступайте в сообщество, где царит поддержка, ободрение и трудолюбие.
                    Завоюйте уважение и новых друзей.
                </p>
            </div>
            <div class="atmosphere__media-bundles-list media-bundles">
                <div class="media-bundles__item">
                    <div class="media-bundles__img-wrap">
                        <img src="/img/atmosphere_gal-preview_1.png" alt="" class="media-bundles__img">
                    </div>
                    <p class="media-bundles__name">Новый зал и&nbsp;экипировка</p>
                    <div class="media-bundles__amount-content">12 фотографий</div>
                </div>
                <div class="media-bundles__item">
                    <div class="media-bundles__img-wrap">
                        <img src="/img/atmosphere_gal-preview_2.png" alt="" class="media-bundles__img">
                    </div>
                    <p class="media-bundles__name">Чистые раздевалки, шкафчики и душ</p>
                    <div class="media-bundles__amount-content">12 фотографий</div>
                </div>
                <div class="media-bundles__item">
                    <div class="media-bundles__img-wrap">
                        <img src="/img/atmosphere_gal-preview_3.png" alt="" class="media-bundles__img">
                    </div>
                    <p class="media-bundles__name">Наша команда: инструктор, рефери</p>
                    <div class="media-bundles__amount-content">12 фотографий</div>
                </div>
                <div class="media-bundles__item">
                    <div class="media-bundles__img-wrap">
                        <img src="/img/atmosphere_youtube.png" alt="" class="media-bundles__img">
                    </div>
                    <p class="media-bundles__name">YouTube-канал Brave</p>
                    <div class="media-bundles__amount-content">12 видео</div>
                </div>
            </div>
        </section>

        <section class="main-page__opponents opponents">
            <div class="opponents__header main-info">
                <h2 class="main-info__title title-l1">Найдите соперника и друга</h2>
                <p class="main-info__text">Выберите соперника по силам и вступите в спарринг.<br>
                    Вы победите страх.
                </p>
            </div>
            <div class="opponents__search-wrap opponent-search">
                <div class="opponent-search__criterions">
                    <div class="opponent-search__field field">
                        <label class="field__name" for="city-select">Ваш город</label>
                        <div class="field__input-wrap">
                            <select name="city" id="city-select" class="field__select select">
                                <option value="">Талдыкорган</option>
                                <option value="">Алматы</option>
                                <option value="">Караганда</option>
                            </select>
                        </div>
                    </div>
                    <div class="opponent-search__field field">
                        <label class="field__name" for="discipline">Дисциплина спарринга</label>
                        <div class="field__input-wrap">
                            <select name="discipline" id="discipline" class="field__select select">
                                <option value="">MMA</option>
                                <option value="">Вольная борьба</option>
                                <option value="">Бокс</option>
                            </select>
                        </div>
                    </div>
                    <div class="opponent-search__field field">
                        <label class="field__name" for="weight">Весовая категория</label>
                        <div class="field__input-wrap">
                            <select name="weight" id="weight" class="field__select select">
                                <option value="">Легкий вес, 56-63 кг</option>
                                <option value="">Средний вес, 63-70 кг</option>
                                <option value="">Тяжелый вес, 90-100 кг</option>
                            </select>
                        </div>
                    </div>
                    <div class="opponent-search__field field">
                        <label class="field__name" for="experience">Опыт соперника</label>
                        <div class="field__input-wrap">
                            <select name="experience" id="experience" class="field__select select">
                                <option value="">Начинающий</option>
                                <option value="">Профи</option>
                            </select>
                        </div>
                    </div>
                    <div class="opponent-search__field opponent-search__field--btn">
                        <a href="#" class="opponent-search__btn button">
                            <span class="button__text">ПОКАЗАТЬ</span>
                        </a>
                    </div>
                </div>
                <div class="opponent-search__result">Найдено 15 бойцов</div>
                <p class="opponent-search__about-battles">Спарринг проводится в защитной экипировке по
                    <a href="#" class="link">правилам Brave</a> под надзором инструктора и рефери.
                </p>
            </div>
        </section>


        <section class="main-page__reviews reviews">
            <div class="reviews__slider js_reviews_slick">
                <div class="reviews__slide">
                    <div class="reviews__slide-container">
                        <div class="reviews__person-img-wrap">
                            <img src="/img/reviews_1.jpg" alt="" class="reviews__img">
                        </div>
                        <div class="reviews__person-info">
                            <div class="reviews__person-name">Борис Федоров</div>
                            <div class="reviews__person-occupation">Предпринематель, 30 лет</div>
                            <div class="reviews__person-about-me-wrap">
                                <span class="reviews__person-about-me">
                                    В первую очередь, я стал дисциплинированней и спокойней. До сих пор помню, как дрожали колени, когда впервые вышел на спарринг. Соперник казался непобедимым, но поединок шел довольно ровно.
                                    <span class="reviews__highlight">Я уступил по очкам, но добился огромной победы внутри.</span> Перестраивать себя сложно: дисциплина растет медленно, но я вижу результаты, совершаю маленькие шаги и двигаюсь вперед.
                                </span>
                            </div>
                            <div class="reviews__objectives-wrap">
                                <div class="reviews__objectives-title">Цели за месяц</div>
                                <div class="reviews__objectives">
                                    Выполнил 100 отжиманий за раз<br>
                                    Прошел через 15 поединков<br>
                                    Увеличил зарплату в 2,5 раза
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reviews__slide">
                    <div class="reviews__slide-container">
                        <div class="reviews__person-img-wrap">
                            <img src="/img/reviews_1.jpg" alt="" class="reviews__img">
                        </div>
                        <div class="reviews__person-info">
                            <div class="reviews__person-name">Борис Федоров</div>
                            <div class="reviews__person-occupation">Предпринематель, 30 лет</div>
                            <div class="reviews__person-about-me-wrap">
                                <span class="reviews__person-about-me">
                                    В первую очередь, я стал дисциплинированней и спокойней. До сих пор помню, как дрожали колени, когда впервые вышел на спарринг. Соперник казался непобедимым, но поединок шел довольно ровно.
                                    <span class="reviews__highlight">Я уступил по очкам, но добился огромной победы внутри.</span> Перестраивать себя сложно: дисциплина растет медленно, но я вижу результаты, совершаю маленькие шаги и двигаюсь вперед.
                                </span>
                            </div>
                            <div class="reviews__objectives-wrap">
                                <div class="reviews__objectives-title">Цели за месяц</div>
                                <div class="reviews__objectives">
                                    Выполнил 100 отжиманий за раз<br>
                                    Прошел через 15 поединков<br>
                                    Увеличил зарплату в 2,5 раза
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reviews__slide">
                    <div class="reviews__slide-container">
                        <div class="reviews__person-img-wrap">
                            <img src="/img/reviews_1.jpg" alt="" class="reviews__img">
                        </div>
                        <div class="reviews__person-info">
                            <div class="reviews__person-name">Борис Федоров</div>
                            <div class="reviews__person-occupation">Предпринематель, 30 лет</div>
                            <div class="reviews__person-about-me-wrap">
                                <span class="reviews__person-about-me">
                                    В первую очередь, я стал дисциплинированней и спокойней. До сих пор помню, как дрожали колени, когда впервые вышел на спарринг. Соперник казался непобедимым, но поединок шел довольно ровно.
                                    <span class="reviews__highlight">Я уступил по очкам, но добился огромной победы внутри.</span> Перестраивать себя сложно: дисциплина растет медленно, но я вижу результаты, совершаю маленькие шаги и двигаюсь вперед.
                                </span>
                            </div>
                            <div class="reviews__objectives-wrap">
                                <div class="reviews__objectives-title">Цели за месяц</div>
                                <div class="reviews__objectives">
                                    Выполнил 100 отжиманий за раз<br>
                                    Прошел через 15 поединков<br>
                                    Увеличил зарплату в 2,5 раза
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section class="main-page__habit habit">
            <div class="habit__header main-info">
                <h3 class="main-info__title title-l1">Привычка побеждать</h3>
                <p class="main-info__text">Чтобы развивать дисциплину и строить привычку достигать цель, мы делаем
                    участникам вызовы. Это упражнения и простые задания, которые&nbsp;помогают выйти из зоны комфорта.
                </p>
            </div>
            <div class="habit__body">
                <div class="habit__info-col">
                    <div class="habit__text-wrap text-blocks text-blocks--center">
                        <p class="text-blocks__item">За выполненный вызов участники получают рейтинг.
                            Он дает доступ к более сложным вызовам и более ценным призам.
                        </p>
                        <p class="text-blocks__item">Вы соревнуетесь с друзьями, совершенствуетесь и можете
                            завоевать награду, победив в ежемесячном вызове.
                            Так рождается привычка побеждать. Для начала — свою лень.
                        </p>
                    </div>
                    <p class="habit__change">Награда изменит вас навсегда</p>
                </div>
                <div class="habit__img-wrap">
                    <img src="/img/habit-winning_img.jpg" alt="" class="habit__img">
                </div>
            </div>
        </section>


        <section class="main-page__first-challenge first-challenge">
            <div class="first-challenge__wrapper">
                <h3 class="first-challenge__title title-l1">Первый вызов</h3>
                <p class="first-challenge__text">Мы делаем вам первый вызов —
                    выполнять простое действие каждый день.<br>
                    Вы готовы?
                </p>
                <div class="first-challenge__btn-wrap">
                    <a href="#" class="first-challenge__btn button"><span class="button__text">ПРИНЯТЬ ВЫЗОВ</span></a>
                </div>
            </div>
        </section>


        <section class="main-page__mailing mailing">
            <div class="mailing__header main-info">
                <h3 class="main-info__title title-l1">Еженедельная рассылка</h3>
                <p class="main-info__text">Одно письмо в неделю — реальная история, скидки на абонементы и
                    упражения, чтобы научиться отрывать задницу от дивана.
                </p>
            </div>
            <div class="mailing__subscribe">
                <div class="mailing__input-wrap">
                    <input type="email" class="mailing__input input" placeholder="EXAMPLE@MAIL.COM">
                </div>
                <div class="mailing__btn-wrap">
                    <button class="mailing__btn button"><span class="button__text">ПОДПИСАТЬСЯ</span></button>
                </div>
            </div>
        </section>


        <section class="main-page__instagram instagram">
            <h3 class="instagram__title title-l1">Наш Инстаграм</h3>
            <div class="instagram__gallery">
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/instagram-image.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <div class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </div>
                    </div>
                </div>
            </div>
            <p class="instagram__subscribe-text">Подпишитесь на Brave в <a href="#" class="link bold">Инстаграме</a> и будьте в курсе наших новостей</p>
        </section>


        <section class="main-page__what-prevents what-prevents">
            <h3 class="what-prevents__title title-l1">Что мешает начать?</h3>
            <ul class="what-prevents__causes accordion js_accordion">
                <li class="accordion__item">
                    <p class="accordion__item-title">Я подумаю, может начну попозже</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">Здорово! Надеемся, вам нравится и вы довольны результатом.
                                Если станет скучно — попробуйте прийти к нам на бесплатную тренировку. У нас особенная
                                атмосфера для занятий спортом.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="accordion__item">
                    <p class="accordion__item-title">Я пока не готов физически</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">Здорово! Надеемся, вам нравится и вы довольны результатом.
                                Если станет скучно — попробуйте прийти к нам на бесплатную тренировку. У нас особенная
                                атмосфера для занятий спортом.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="accordion__item">
                    <p class="accordion__item-title">Я не люблю драки, насилие и агрессию</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">Здорово! Надеемся, вам нравится и вы довольны результатом.
                                Если станет скучно — попробуйте прийти к нам на бесплатную тренировку. У нас особенная
                                атмосфера для занятий спортом.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="accordion__item">
                    <p class="accordion__item-title">Нет лишних денег, я могу тренироваться сам</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">Здорово! Надеемся, вам нравится и вы довольны результатом.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="accordion__item">
                    <p class="accordion__item-title">Я занят, времени совсем нет</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">Здорово! Надеемся, вам нравится и вы довольны результатом.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="accordion__item">
                    <p class="accordion__item-title">Я уже тренируюсь</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">Здорово! Надеемся, вам нравится и вы довольны результатом.
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>


        <section class="main-page__proverb proverb">
            <p class="proverb__text">Лучше время посадить дерево — 20 лет назад.<br>
                Второе лучшее время — сейчас.
            </p>
            <div class="proverb__what">Китайская пословица</div>
        </section>


        <section class="main-page__create-profile create-profile">
            <div class="create-profile__wrapper">
                <h3 class="create-profile__title title-l3">Создайте профиль</h3>
                <p class="create-profile__text">Вы сможете пригласить на спарринг друга или участника Brave,
                    принимать вызовы и получать рейтинг.
                </p>
                <div class="create-profile__btn-wrap">
                    <a href="#" class="create-profile__btn button"><span class="button__text">СОЗДАТЬ</span></a>
                </div>
            </div>
        </section>


        <section class="main-page__join-brave join-brave">
            <div class="join-brave__header main-info">
                <h3 class="main-info__title title-l1">Вступите в Brave</h3>
                <p class="main-info__text">
                    Вы можете получить скидку до 35% приобретая <a href="#" class="link">комплект услуг</a>
                </p>
            </div>
            <ul class="join-brave__offers">
                <li class="join-brave__offer brave-offer brave-offer--1">
                    <div class="brave-offer__top">
                        <div class="brave-offer__title">ПЕРВАЯ<br>ТРЕНИРОВКА</div>
                        <div class="brave-offer__description">Экскурсия, инструктаж и занятие в группе для новых участников.</div>
                    </div>
                    <div class="brave-offer__bottom">
                        <div class="brave-offer__price-wrap">
                            <span class="brave-offer__price">БЕСПЛАТНО</span>
                        </div>
                        <div class="brave-offer__btn-wrap">
                            <a href="#" class="brave-offer__btn button button--c-transparent"><span class="button__text">ЗАКАЗАТЬ</span></a>
                        </div>
                    </div>
                </li>
                <li class="join-brave__offer brave-offer brave-offer--2">
                    <div class="brave-offer__top">
                        <div class="brave-offer__title">ПЕРВЫЙ<br>СПАРРИНГ</div>
                        <div class="brave-offer__description">Со своим партнером или инструктором. Футболка участника в подарок.</div>
                    </div>
                    <div class="brave-offer__bottom">
                        <div class="brave-offer__price-wrap">
                            <span class="brave-offer__price">8 500 ТГ</span>
                        </div>
                        <div class="brave-offer__btn-wrap">
                            <a href="#" class="brave-offer__btn button button--c-transparent"><span class="button__text">ЗАКАЗАТЬ</span></a>
                        </div>
                    </div>
                </li>
                <li class="join-brave__offer brave-offer brave-offer--3">
                    <div class="brave-offer__top">
                        <div class="brave-offer__title">МЕСЯЧНЫЙ<br>АБОНЕМЕНТ</div>
                        <div class="brave-offer__description">Тренировочный курс с инструктором, 8 спаррингов, фирменная футболка.</div>
                    </div>
                    <div class="brave-offer__bottom">
                        <div class="brave-offer__price-wrap">
                            <div class="brave-offer__about-discount">Скидка 30% до 30 мая</div>
                            <span class="brave-offer__old-price">35 000 ТГ</span>
                            <span class="brave-offer__price">24 500 ТГ</span>
                        </div>
                        <div class="brave-offer__btn-wrap">
                            <a href="#" class="brave-offer__btn button button--c-transparent"><span class="button__text">ЗАКАЗАТЬ</span></a>
                        </div>
                    </div>
                </li>
            </ul>
        </section>

    </div>

@endsection
