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
                <label>Текст 1</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_1"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_1}}</textarea>
            </div>
            <div class="form-group">
                <label>Текст 2</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_2"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_2}}</textarea>
            </div>
            <div class="form-group">
                <label>Текст 3</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_3"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_3}}</textarea>
            </div>
            <div class="form-group">
                <label>Текст 4</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text_4"
                          data-type="text"
                          data-block="sparring"
                          data-id="0">{{$block->text_4}}</textarea>
            </div>

            <div class="form-group">
                <label>Заголовок 2</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->etiquette_title}}"
                       data-name="etiquette_title"
                       data-type="string"
                       data-block="sparring"
                       data-id="0">
            </div>

            <div class="box box-info group-item-widget" data-block="etiquette_list">
                <div class="box-header with-border">
                    <h3 class="box-title"> Этикет: </h3>
                    <button type="submit" data-parent="0" class="btn btn-primary pull-right add-flat-item">Добавить</button>
                </div>
                <div class="box-body">
                    <div class="groupflat-widget group-item-wrap">
                        @foreach($block->etiquette_list_group as $item)
                            @include('back.groups.etiquette_list.etiquette_list_box', ['item' => $item])
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection