@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Инстаграм'])
    <div class="box box-info group-item-widget" data-block="posts_list">
        <div class="box-header with-border">
            <h3 class="box-title"> Список постов </h3>
            <button type="submit" data-parent="0" class="btn btn-primary pull-right add-flat-item">Добавить</button>
        </div>
        <div class="box-body">
            <div class="groupflat-widget group-item-wrap">
                @foreach($block->posts_list_group as $item)
                    @include('back.groups.posts_list.posts_list_box', ['item' => $item])
                @endforeach
            </div>
        </div>
    </div>
@endsection
