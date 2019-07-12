@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Спарринг'])
    <div class="box box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Заголовок</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->title_field}}"
                       data-name="title"
                       data-type="string"
                       data-block="sparring"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Подзаголовок</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="subtitle"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->subtitle}}</textarea>
            </div>
            <div class="form-group">
                <label>Условие 1</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_1"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_1}}</textarea>
            </div>
            <div class="form-group">
                <label>Условие 2</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_2"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_2}}</textarea>
            </div>
            <div class="form-group">
                <label>Условие 3</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_3"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_3}}</textarea>
            </div>
            <div class="form-group">
                <label>Условие 4</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_4"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_4}}</textarea>
            </div>
        </div>
    </div>
@endsection