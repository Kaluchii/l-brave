@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Скрипты'])
    <div class="box box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Поле для вставки скриптов (перед закрывающим тегом head)</label>
                <textarea class="form-control text"
                          data-name="before_head_close"
                          data-type="text"
                          data-block="scripts"
                          data-id="0">{{$block->before_head_close_field}}</textarea>
            </div>
            <div class="form-group">
                <label>Поле для вставки скриптов (после открывающего тега body)</label>
                <textarea class="form-control text"
                          data-name="after_body_open"
                          data-type="text"
                          data-block="scripts"
                          data-id="0">{{$block->after_body_open_field}}</textarea>
            </div>
            <div class="form-group">
                <label>Поле для вставки скриптов (перед закрывающим тегом body)</label>
                <textarea class="form-control text"
                          data-name="before_body_close"
                          data-type="text"
                          data-block="scripts"
                          data-id="0">{{$block->before_body_close_field}}</textarea>
            </div>
        </div>
    </div>
@endsection