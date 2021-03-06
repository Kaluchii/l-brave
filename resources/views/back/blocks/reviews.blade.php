@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Отзывы'])
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
                       data-block="reviews"
                       data-id="0">
            </div>

            <div class="box box-info group-item-widget" data-block="reviews_list">
                <div class="box-header with-border">
                    <h3 class="box-title"> Список отзывов </h3>
                    <button type="submit" data-parent="0" class="btn btn-primary pull-right add-flat-item">Добавить</button>
                </div>
                <div class="box-body">
                    <div class="groupflat-widget group-item-wrap">
                        @foreach($block->reviews_list_group as $item)
                            @include('back.groups.reviews_list.reviews_list_box', ['item' => $item])
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection
