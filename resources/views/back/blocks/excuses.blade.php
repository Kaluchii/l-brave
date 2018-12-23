@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Что мешает'])
    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования данных</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Заголовок</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->title_field}}"
                       data-name="title"
                       data-type="string"
                       data-block="excuses"
                       data-id="0">
            </div>
        </div>

        <div class="box box-info group-item-widget" data-block="excuses_list">
            <div class="box-header with-border">
                <h3 class="box-title"> Список причин </h3>
                <button type="submit" data-parent="0" class="btn btn-primary pull-right add-flat-item">Добавить</button>
            </div>
            <div class="box-body">
                <div class="groupflat-widget group-item-wrap">
                    @foreach($block->excuses_list_group as $item)
                        @include('back.groups.excuses_list.excuses_list_box', ['item' => $item])
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection
