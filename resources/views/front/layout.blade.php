<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico">

    @yield('meta')
    @include('front.styles')
    @yield('styles')
    {{--{!! $scripts->before_head_close_field !!}--}}
</head>
<body>
{{--    {!! $scripts->after_open_field !!}--}}

    <div class="page-wrapper">
        @include('front.header')
        @yield('header')

        @yield('content')

        @include('front.footer')
        @yield('footer')
    </div>

    <div class="layout-bg"></div>

    <div class="hide">
        @include('front.popups.call_back_form')
        @include('front.popups.offer_form')
        @include('front.popups.thank')
        <a href="#thanks" class="js_thank_link"></a>
    </div>

    @include('front.scripts')
    @yield('scripts')

{{--    {!! $scripts->before_close_field !!}--}}

</body>
</html>