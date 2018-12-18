<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ошибка</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<style>
    body {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin: 0;
        display: flex;
        overflow: auto;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    p{
        margin: 0;
    }
    p.big {
        text-align: center;
        font-size: 80px;
        line-height: 75px;
        font-family: "Arial",sans-serif;
        color: #333333;
    }

    p.big:first-child {
        border-bottom: 1px solid #999999;
        margin: 0 auto;
        max-width: 280px;
        font-size: 160px;
        line-height: 140px;
        color: #333333;
    }

    p.big.error {
    }

    p.text {
        font-family: "Arial", sans-serif;
        margin-top: 15px;
        text-align: center;
        color: #333333;
        margin-bottom: 17px;
    }

    a {
        font-size: 36px;
        border-bottom: 1px solid rgba(0, 102, 153, 0.25);
        text-decoration: none;
        color: #006699;
        font-family: "Arial", sans-serif;
    }

    a:hover {
        color: red;
        border-bottom: 1px solid red;
    }

    a {}

    p {
        text-align: center;
    }
</style>
<body>
<div>
<p class="big">500</p>
<p class="big error">Ошибка</p>
<p class="text">Страница временно не доступна</p>
<p><a href="/">На главную</a></p>
</div>
</body>
</html>