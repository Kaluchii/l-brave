@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Для всего сайта'])
    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования данных</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Ссылка на Instagram</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->inst_field}}"
                       data-name="inst"
                       data-type="string"
                       data-block="all_site"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Ссылка на ВКонтакте</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->vk_field}}"
                       data-name="vk"
                       data-type="string"
                       data-block="all_site"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Ссылка на Facebook</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->fb_field}}"
                       data-name="fb"
                       data-type="string"
                       data-block="all_site"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Номер телефона</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->phone_field}}"
                       data-name="phone"
                       data-type="string"
                       data-block="all_site"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Год для копирайта</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->copyright_field}}"
                       data-name="copyright"
                       data-type="string"
                       data-block="all_site"
                       data-id="0">
            </div>
        </div>
    </div>
@endsection