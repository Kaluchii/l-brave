<div class="box">
    <div class="box-header with-border">
        <h3 class="box-title">№ {{$item->sorter_field}}</h3>
        <button type="submit" class="btn btn-primary pull-right remove-flat-item" data-id="{{$item->id_field}}"
                data-block="etiquette_list">Удалить</button>
    </div>

    <div class="box-body">

        <div class="form-group">
            <label>Текст</label>
            <textarea class="form-control text textarea--small" data-reg="true"
                      data-name="text"
                      data-type="text"
                      data-block="etiquette_list"
                      data-id="{{$item->id_field}}">{{$item->text_field}}</textarea>
        </div>

        <div class="col-xs-1 no-padding">
            <div class="form-group">
                <label>Позиция</label>
                <input type="number" class="form-control string"
                       data-id="{{$item->id_field}}"
                       data-block="etiquette_list"
                       data-name="sorter"
                       value="{{$item->sorter_field}}">
            </div>
        </div>
    </div>
</div>