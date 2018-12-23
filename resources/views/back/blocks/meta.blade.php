@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Мета-данные'])
    <div class="box box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования данных</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Тайтл</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->seo_title_field}}"
                       data-name="seo_title"
                       data-type="seo"
                       data-block="about"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Ключевые слова (keywords)</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->seo_keywords_field}}"
                       data-name="seo_keywords"
                       data-type="seo"
                       data-block="about"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Описание страницы (description)</label>
                <textarea class="form-control text"
                          data-name="seo_description"
                          data-type="seo"
                          data-block="about"
                          data-id="0">{{$block->seo_description_field}}</textarea>
            </div>
        </div>
    </div>
@endsection