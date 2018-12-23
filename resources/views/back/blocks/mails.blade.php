@extends('back.layout')
@section('content')

    @include('back.content-top', ['title' => 'Почта'])

    <div class="box box-info group-item-widget"
         data-block="call_mailto">
        <div class="box-header with-border">
            <h3 class="box-title"> Получатели писем </h3>
            <button type="submit" data-parent="0" class="btn btn-primary pull-right add-flat-item">Добавить</button>
        </div>
        <div class="box-body">

            <div class="groupflat-widget group-item-wrap">
                @foreach($block->call_mailto_group as $item)
                    @include('back.groups.call_mailto.call_mailto_box', ['item' => $item])
                @endforeach
            </div>
        </div>
    </div>

@endsection