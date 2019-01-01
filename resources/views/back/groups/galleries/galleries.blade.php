@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Галерея'])
    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования данных</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Название галереи</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$item->gallery_name}}"
                       data-name="gallery_name"
                       data-type="string"
                       data-block="galleries"
                       data-id="{{$item->id_field}}">
            </div>
            <div class="form-group">
                <label>Количество фото в галерее</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$item->explanation}}"
                       data-name="explanation"
                       data-type="string"
                       data-block="galleries"
                       data-id="{{$item->id_field}}">
            </div>
            <div class="form-group">
                <label>Превью (170x120px)</label>
                <div class="dropzone">
                    <div class="file-input">
                        <div class="file-preview">
                            <div class="input-group file-caption-main">
                                <div class="file-preview-frame">
                                    <div class="kv-file-content">
                                        <img src="{{$item->img_field->link}}?{{$item->img_field->cache_index}}" class="kv-preview-data file-preview-image"
                                             title="{{$item->img_field->alt}}" alt="{{$item->img_field->alt}}">
                                    </div>
                                    <div class="file-thumbnail-footer">
                                        <div class="file-actions">
                                            <input type="text" class="form-control alt-text" data-block="galleries"
                                                   data-type="images" data-id="{{$item->id_field}}" data-name="alt"
                                                   value="{{$item->img_field->alt}}">
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group-btn">
                                <button type="button" tabindex="500" title="Clear selected files"
                                        class="btn btn-default fileinput-remove fileinput-remove-button"><i
                                            class="glyphicon glyphicon-trash"></i> <span class="hidden-xs">Очистить</span></button>
                                <button type="button" tabindex="500" title="Abort ongoing upload"
                                        class="btn btn-default hide fileinput-cancel fileinput-cancel-button"><i
                                            class="glyphicon glyphicon-ban-circle"></i> <span class="hidden-xs">Cancel</span></button>
                                <div tabindex="500" class="btn btn-primary btn-file">
                                    <i class="glyphicon glyphicon-folder-open"></i>&nbsp;
                                    <span class="hidden-xs">Выбрать изображение …</span>
                                    <input type="file" class="form-control file"
                                           data-block="galleries"
                                           data-name="img"
                                           data-type="image"
                                           data-id="{{$item->id_field}}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="box box-info group-item-widget" data-block="gallery_slides">
                <div class="box-header with-border">
                    <h3 class="box-title"> Список слайдов </h3>
                    <button type="submit" data-parent="{{$item->id_field}}" class="btn btn-primary pull-right add-flat-item">Добавить</button>
                </div>
                <div class="box-body">
                    <div class="groupflat-widget group-item-wrap">
                        @foreach($item->gallery_slides_group as $slide_item)
                            @include('back.groups.gallery_slides.gallery_slides_box', ['item' => $slide_item])
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection