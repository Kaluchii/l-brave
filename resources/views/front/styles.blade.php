@section('styles')
    <script>(function (e, c) {
            e[c] = e[c].replace(/(ua_js_)no/g, "$1yes");
        })(document.documentElement, "className");
        (function (d, n) {
            d.documentElement.className += " ua_svg_" + (d[n] && d[n]("http://www.w3.org/2000/svg", "svg").createSVGRect ? "yes" : "no");
        })(document, "createElementNS");</script>
    <link rel="stylesheet" href="/css/vendor.min.css">
    <link rel="stylesheet" href="/css/style.min.css">
    <link href="https://fonts.googleapis.com/css?family=Play:400,700&amp;subset=cyrillic" rel="stylesheet">
@endsection
