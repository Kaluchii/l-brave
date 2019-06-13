@section('meta')
    <title>{{ $about->seo_title }}</title>
    <meta name="description" content="{{ $about->seo_description }}">
    <meta name="keywords" content="{{ $about->seo_keywords }}">
@endsection