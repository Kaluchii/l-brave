@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Атмосфера'])
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
                       data-block="atmosphere"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Текст под заголовком</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="subtitle_text"
                          data-type="text"
                          data-block="atmosphere"
                          data-id="0">{{$block->subtitle_text_field}}</textarea>
            </div>
            <div class="form-group">
                <label>Заголовок для блока с YouTube-каналом</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->channel_name}}"
                       data-name="channel_name"
                       data-type="string"
                       data-block="atmosphere"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Ссылка на YouTube-канал</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->channel_link}}"
                       data-name="channel_link"
                       data-type="string"
                       data-block="atmosphere"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Количество видео</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->explanation}}"
                       data-name="explanation"
                       data-type="string"
                       data-block="atmosphere"
                       data-id="0">
            </div>

            <div class="box table-widget">
                <div class="box-header with-border">
                    <h3 class="box-title">
                        Список галерей
                    </h3>
                    <button type="button" data-parent="0" class="btn btn-primary pull-right add-group-item">Добавить</button>
                    <div class="col-xs-5 pull-right">
                        <input type="text" class="form-control add-item"
                               data-name="gallery_name"
                               data-block="galleries"
                               placeholder="Название элемента"
                        >
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered table-hover dataTable table-widget-selector" role="grid"
                           aria-describedby="example2_info"
                           data-block="galleries">
                        <thead>
                        <tr role="row">
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                colspan="1" aria-label="">ID</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                colspan="1" aria-label="">Название</th>
                            {{--<th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                colspan="1" aria-label="">Дата редактирования</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                colspan="1" aria-label="">Статус публикации</th>--}}
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                colspan="1" aria-label="">Порядок выдачи</th>
                            <th  tabindex="0"  rowspan="1"
                                 colspan="1" aria-label="">Удаление</th>
                        </tr>
                        </thead>
                        <tbody>

                        @foreach($block->galleries_group as $item)
                            @include('back.groups.galleries.galleries_row',['item' => $item])
                        @endforeach

                        </tbody>

                    </table>
                </div>
                <!-- /.box-body -->
            </div>
            <div class="form-group">
                <label>Изображение (1280x800 пикселей)</label>
                <div class="dropzone">
                    <div class="file-input">
                        <div class="file-preview">
                            <div class="input-group file-caption-main">
                                <div class="file-preview-frame">
                                    <div class="kv-file-content">
                                        <img src="{{$block->img_field->link}}?{{$block->img_field->cache_index}}" class="kv-preview-data file-preview-image"
                                             title="{{$block->img_field->alt}}" alt="{{$block->img_field->alt}}">
                                    </div>
                                    <div class="file-thumbnail-footer">
                                        <div class="file-actions">
                                            <input type="text" class="form-control alt-text" data-block="about"
                                                   data-type="images" data-id="0" data-name="alt"
                                                   value="{{$block->img_field->alt}}">
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
                                           data-block="atmosphere"
                                           data-name="img"
                                           data-type="image"
                                           data-id="0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection