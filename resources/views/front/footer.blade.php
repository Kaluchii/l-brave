@section('footer')
    <footer class="footer">
        <div class="footer__lead-wrap">
            <p class="footer__lead">
                {{--<a href="#" class="link link_style_accent link_style_underline footer__lead-link">Пригласите друга</a> и получите скидку 20% на два абонемента.--}}
                {!! $offers->stock !!}
            </p>
        </div>
        <div class="container">
            <div class="footer__wrapper">
                <div class="footer__section">
                    <span class="footer__header">{{ $all_site->copyright }}</span>
                    <ul class="footer__statistics">
                        <li class="footer__statistics-item">56 участников</li>
                        <li class="footer__statistics-item">1 352 выполненных вызова</li>
                        <li class="footer__statistics-item">252 спарринга</li>
                    </ul>
                </div>
                <div class="footer__section">
                    <span class="footer__header">Узнайте о нас больше</span>
                    <ul class="footer__social">
                        <li class="footer__social-item">
                            <a href="{{ $all_site->inst }}" class="icon icon-instagram"></a>
                            <a href="{{ $all_site->inst }}" class="link link_style_accent link_style_underline footer__social-link">Instagram</a>
                        </li>
                        <li class="footer__social-item">
                            <a href="{{ $all_site->vk }}" class="icon icon-vk"></a>
                            <a href="{{ $all_site->vk }}" class="link link_style_accent link_style_underline footer__social-link">ВКонтакте</a>
                        </li>
                        <li class="footer__social-item">
                            <a href="{{ $all_site->fb }}" class="icon icon-facebook"></a>
                            <a href="{{ $all_site->fb }}" class="link link_style_accent link_style_underline footer__social-link">Фейсбук</a>
                        </li>
                    </ul>
                </div>
                <div class="footer__section">
                    <span class="footer__header">Телефон и WhatsApp для справок&nbsp;и&nbsp;записи</span>
                    <a href="tel:{{ str_replace(array(' ', '(' , ')', '-'), '', $all_site->phone) }}" class="footer__phone">{{ $all_site->phone }}</a>
                    {{--<a href="#" class="link link_style_accent link_style_underline footer__franchise">Хотите открыть Brave в своем зале?</a>--}}
                    <span class="footer__franchise">Хотите открыть Brave в своем зале?</span>
                </div>
            </div>
        </div>
    </footer>
@endsection