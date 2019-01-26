@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Запись на спарринг'])
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
                       data-block="signing_up"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Текст</label>
                <textarea class="form-control text" data-reg="true"
                          data-name="text"
                          data-type="text"
                          data-block="signing_up"
                          data-id="0">{{$block->text_field}}</textarea>
            </div>
        </div>
    </div>
@endsection