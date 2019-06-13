@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Титульный блок'])
    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования данных</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Заголовок страницы</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="title"
                          data-type="string"
                          data-block="title_block"
                          data-id="0">{{$block->title}}</textarea>
            </div>
            <div class="form-group">
                <label>Текст под заголовком</label>
                <textarea class="form-control text textarea--small"
                          data-name="objectives"
                          data-type="text"
                          data-block="title_block"
                          data-id="0">{{$block->objectives}}</textarea>
            </div>
            <div class="form-group">
                <label>Клиент1: Имя Фам.</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->client_name_1}}"
                       data-name="client_name_1"
                       data-type="string"
                       data-block="title_block"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Профессия</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->profession_1}}"
                       data-name="profession_1"
                       data-type="string"
                       data-block="title_block"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Характеристики</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->specifications_1}}"
                       data-name="specifications_1"
                       data-type="string"
                       data-block="title_block"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Клиент2: Имя Фам.</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->client_name_2}}"
                       data-name="client_name_2"
                       data-type="string"
                       data-block="title_block"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Профессия</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->profession_2}}"
                       data-name="profession_2"
                       data-type="string"
                       data-block="title_block"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Характеристики</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->specifications_2}}"
                       data-name="specifications_2"
                       data-type="string"
                       data-block="title_block"
                       data-id="0">
            </div>
        </div>
    </div>
@endsection