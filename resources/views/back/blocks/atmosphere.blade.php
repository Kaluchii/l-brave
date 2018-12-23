@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Атмосфера'])
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
                       data-block="atmosphere"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Текст под заголовком</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="subtitle_text"
                          data-type="text"
                          data-block="atmosphere"
                          data-id="0">{{$block->subtitle_text_field}}</textarea>
            </div>
        </div>
    </div>
@endsection