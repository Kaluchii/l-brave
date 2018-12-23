<div class="box">
    <div class="box-header with-border">
        <h3 class="box-title">Получатель</h3>
        <button type="submit" class="btn btn-primary pull-right remove-flat-item" data-id="{{$item->id_field}}"
                data-block="call_mailto">Удалить</button>
    </div>
    <div class="box-body">

        <div class="form-group">
            <label>Адрес почты</label>
            <input class="form-control string"
                   type="text" placeholder=""
                   value="{{$item->to_field}}"
                   data-name="to"
                   data-type="string"
                   data-block="call_mailto"
                   data-id="{{$item->id_field}}">
        </div>

    </div>
</div>