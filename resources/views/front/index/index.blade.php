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
                <h2 class="main-info__title title-l1">{{ $about->title }}</h2>
                <p class="main-info__text">{!! $about->subtitle_text !!}</p>
            </div>
            <div class="about__body">
                <div class="about__img-wrap">
                    <img src="{{$about->img->link}}?{{$about->img->cache_index}}" alt="{{$about->img->alt}}" class="about__img">
                </div>
                <div class="about__info-col">
                    <div class="about__text-wrap text-blocks">{!! $about->text !!}</div>
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
                <h3 class="main-info__title title-l1">{{ $atmosphere->title }}</h3>
                <p class="main-info__text">{!! $atmosphere->subtitle_text !!}</p>
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

        {{--<section class="main-page__opponents opponents">
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
        </section>--}}


        <section class="main-page__reviews reviews">
            <div class="reviews__slider js_reviews_slick">
                @foreach($reviews->reviews_list_group as $item)
                <div class="reviews__slide">
                    <div class="reviews__slide-container">
                        <div class="reviews__person-img-wrap">
                            <img src="{{$item->img->link}}?{{$item->img->cache_index}}" alt="{{$item->img->alt}}" class="reviews__img">
                        </div>
                        <div class="reviews__person-info">
                            <div class="reviews__person-name">{{ $item->person_name }}</div>
                            <div class="reviews__person-occupation">{{ $item->person_occupation }}</div>
                            <div class="reviews__person-about-me-wrap">
                                <span class="reviews__person-about-me">{!! $item->text !!}</span>
                            </div>
                            <div class="reviews__objectives-wrap">
                                <div class="reviews__objectives-title">Цели за месяц</div>
                                <div class="reviews__objectives">{!! $item->objectives !!}</div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </section>


        <section class="main-page__habit habit">
            <div class="habit__header main-info">
                <h3 class="main-info__title title-l1">{{ $habit->title }}</h3>
                <p class="main-info__text">{!! $habit->subtitle_text !!}</p>
            </div>
            <div class="habit__body">
                <div class="habit__info-col">
                    <div class="habit__text-wrap text-blocks text-blocks--center">{!! $habit->text !!}</div>
                    <p class="habit__change">Награда изменит вас навсегда</p>
                </div>
                <div class="habit__img-wrap">
                    <img src="{{$habit->img->link}}?{{$habit->img->cache_index}}" alt="{{$habit->img->alt}}" class="habit__img">
                </div>
            </div>
        </section>


        <section class="main-page__first-challenge first-challenge">
            <div class="first-challenge__wrapper">
                <h3 class="first-challenge__title title-l1">{{ $challenge->title }}</h3>
                <p class="first-challenge__text">{!! $challenge->text !!}</p>
                <div class="first-challenge__btn-wrap">
                    <a href="#" class="first-challenge__btn button"><span class="button__text">ПРИНЯТЬ ВЫЗОВ</span></a>
                </div>
            </div>
        </section>


        {{--<section class="main-page__mailing mailing">
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
        </section>--}}


        <section class="main-page__instagram instagram">
            <h3 class="instagram__title title-l1">Наш Инстаграм</h3>
            <div class="instagram__gallery">
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/instagram-image.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
                <div class="instagram__gallery-item">
                    <div class="instagram__gallery-item-container">
                        <a href="#" class="instagram__img-wrap">
                            <img src="/img/placeholder.jpg" alt="" class="instagram__img">
                        </a>
                    </div>
                </div>
            </div>
            <p class="instagram__subscribe-text">Подпишитесь на Brave в <a href="{{ $all_site->inst }}" class="link bold">Инстаграме</a> и будьте в курсе наших новостей</p>
        </section>


        <section class="main-page__what-prevents what-prevents">
            <h3 class="what-prevents__title title-l1">Что мешает начать?</h3>
            <ul class="what-prevents__causes accordion js_accordion">
                @foreach($excuses->excuses_list_group as $item)
                <li class="accordion__item">
                    <p class="accordion__item-title">{{ $item->excuses_title }}</p>
                    <div class="accordion__item-content-wrap">
                        <div class="accordion__item-content">
                            <p class="accordion__text">{!! $item->text !!}</p>
                        </div>
                    </div>
                </li>
                @endforeach
            </ul>
        </section>


        <section class="main-page__proverb proverb">
            <p class="proverb__text">Лучше время посадить дерево — 20 лет назад.<br>
                Второе лучшее время — сейчас.
            </p>
            <div class="proverb__what">Китайская пословица</div>
        </section>


        {{--<section class="main-page__create-profile create-profile">
            <div class="create-profile__wrapper">
                <h3 class="create-profile__title title-l3">Создайте профиль</h3>
                <p class="create-profile__text">Вы сможете пригласить на спарринг друга или участника Brave,
                    принимать вызовы и получать рейтинг.
                </p>
                <div class="create-profile__btn-wrap">
                    <a href="#" class="create-profile__btn button"><span class="button__text">СОЗДАТЬ</span></a>
                </div>
            </div>
        </section>--}}


        <section class="main-page__join-brave join-brave">
            <div class="join-brave__header main-info">
                <h3 class="main-info__title title-l1">{{ $offers->title }}</h3>
                <p class="main-info__text">{!! $offers->text !!}</p>
            </div>
            <ul class="join-brave__offers">
                <li class="join-brave__offer brave-offer brave-offer--1">
                    <div class="brave-offer__top">
                        <div class="brave-offer__title">{!! $offers->offer_1_title !!}</div>
                        <div class="brave-offer__description">{!! $offers->offer_1_text !!}</div>
                    </div>
                    <div class="brave-offer__bottom">
                        <div class="brave-offer__price-wrap">
                            @if($offers->offer_1_discount)
                            <div class="brave-offer__about-discount">{{ $offers->offer_1_discount }}</div>
                            @endif
                            @if($offers->offer_1_old_price)
                            <span class="brave-offer__old-price">{{ $offers->offer_1_old_price }}</span>
                            @endif
                            <span class="brave-offer__price">{{ $offers->offer_1_price }}</span>
                        </div>
                        <div class="brave-offer__btn-wrap">
                            <a href="#" class="brave-offer__btn button button--c-transparent"><span class="button__text">ЗАКАЗАТЬ</span></a>
                        </div>
                    </div>
                </li>
                <li class="join-brave__offer brave-offer brave-offer--2">
                    <div class="brave-offer__top">
                        <div class="brave-offer__title">{!! $offers->offer_2_title !!}</div>
                        <div class="brave-offer__description">{!! $offers->offer_2_text !!}</div>
                    </div>
                    <div class="brave-offer__bottom">
                        <div class="brave-offer__price-wrap">
                            @if($offers->offer_2_discount)
                                <div class="brave-offer__about-discount">{{ $offers->offer_2_discount }}</div>
                            @endif
                            @if($offers->offer_2_old_price)
                                <span class="brave-offer__old-price">{{ $offers->offer_2_old_price }}</span>
                            @endif
                            <span class="brave-offer__price">{{ $offers->offer_2_price }}</span>
                        </div>
                        <div class="brave-offer__btn-wrap">
                            <a href="#" class="brave-offer__btn button button--c-transparent"><span class="button__text">ЗАКАЗАТЬ</span></a>
                        </div>
                    </div>
                </li>
                <li class="join-brave__offer brave-offer brave-offer--3">
                    <div class="brave-offer__top">
                        <div class="brave-offer__title">{!! $offers->offer_3_title !!}</div>
                        <div class="brave-offer__description">{!! $offers->offer_3_text !!}</div>
                    </div>
                    <div class="brave-offer__bottom">
                        <div class="brave-offer__price-wrap">
                            @if($offers->offer_3_discount)
                                <div class="brave-offer__about-discount">{{ $offers->offer_1_discount }}</div>
                            @endif
                            @if($offers->offer_3_old_price)
                                <span class="brave-offer__old-price">{{ $offers->offer_3_old_price }}</span>
                            @endif
                            <span class="brave-offer__price">{{ $offers->offer_3_price }}</span>
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
