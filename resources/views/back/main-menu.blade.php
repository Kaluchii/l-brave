@section('main-menu')
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li class="header">Главная страница</li>
            <li>
                <a href="/adm/all">
                    <i class="fa fa-globe"></i> <span>Общие настройки</span>
                </a>
            </li>
            <li>
                <a href="/adm/seo">
                    <i class="fa fa-chrome"></i> <span>СЕО</span>
                </a>
            </li>



            {{--<li>--}}
                {{--<a href="reg">--}}
                    {{--<i class="fa fa-link"></i> <span>Регистрация</span>--}}
                {{--</a>--}}
            {{--</li>--}}
            {{--<li class="treeview">--}}
                {{--<a href="#"><i class="fa fa-link"></i> <span>Multilevel</span>--}}
                        {{--<span class="pull-right-container">--}}
                            {{--<i class="fa fa-angle-left pull-right"></i>--}}
                        {{--</span>--}}
                {{--</a>--}}
                {{--<ul class="treeview-menu">--}}
                    {{--<li><a href="#">Link in level 2</a></li>--}}
                    {{--<li><a href="#">Link in level 2</a></li>--}}
                {{--</ul>--}}
            {{--</li>--}}
        </ul>
    </section>

@endsection