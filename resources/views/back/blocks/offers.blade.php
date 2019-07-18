@extends('back.layout')
@section('content')
    @include('back.content-top', ['title' => 'Вступление в Brave'])
    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Поля для редактирования данных</h3>
        </div>
        <div class="box-body">
            <div class="form-group">
                <label>Заголовок</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->title}}"
                       data-name="title"
                       data-type="string"
                       data-block="offers"
                       data-id="0">
            </div>
            <div class="form-group">
                <label>Текст под заголовком</label>
                <textarea class="form-control text textarea--small" data-reg="true"
                          data-name="text"
                          data-type="text"
                          data-block="offers"
                          data-id="0">{{$block->text}}</textarea>
            </div>

            <div class="form-group">
                <label>Акция</label>
                <input class="form-control string"
                       type="text" placeholder=""
                       value="{{$block->stock}}"
                       data-name="stock"
                       data-type="string"
                       data-block="offers"
                       data-id="0">
            </div>

            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Предложение №1</h3>
                </div>
                <div class="box-body">
                    <div class="form-group">
                        <label>Заголовок</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_1_title}}"
                               data-name="offer_1_title"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Текст под заголовком</label>
                        <textarea class="form-control text textarea--small" data-reg="true"
                                  data-name="offer_1_text"
                                  data-type="text"
                                  data-block="offers"
                                  data-id="0">{{$block->offer_1_text}}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Цена</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_1_price}}"
                               data-name="offer_1_price"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Старая цена (зачеркнута)</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_1_old_price}}"
                               data-name="offer_1_old_price"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Текст скидки</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_1_discount}}"
                               data-name="offer_1_discount"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Изображение (300x470 пикселей)</label>
                        <div class="dropzone">
                            <div class="file-input">
                                <div class="file-preview">
                                    <div class="input-group file-caption-main">
                                        <div class="file-preview-frame">
                                            <div class="kv-file-content">
                                                <img src="{{$block->img_1_field->link}}?{{$block->img_1_field->cache_index}}" class="kv-preview-data file-preview-image"
                                                     title="{{$block->img_1_field->alt}}" alt="{{$block->img_1_field->alt}}">
                                            </div>
                                            <div class="file-thumbnail-footer">
                                                <div class="file-actions">
                                                    <input type="text" class="form-control alt-text" data-block="about"
                                                           data-type="images" data-id="0" data-name="alt"
                                                           value="{{$block->img_1_field->alt}}">
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
                                                   data-block="offers"
                                                   data-name="img_1"
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


            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Предложение №2</h3>
                </div>
                <div class="box-body">
                    <div class="form-group">
                        <label>Заголовок</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_2_title}}"
                               data-name="offer_2_title"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Текст под заголовком</label>
                        <textarea class="form-control text textarea--small" data-reg="true"
                                  data-name="offer_2_text"
                                  data-type="text"
                                  data-block="offers"
                                  data-id="0">{{$block->offer_2_text}}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Цена</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_2_price}}"
                               data-name="offer_2_price"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Старая цена (зачеркнута)</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_2_old_price}}"
                               data-name="offer_2_old_price"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Текст скидки</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_2_discount}}"
                               data-name="offer_2_discount"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Изображение (300x470 пикселей)</label>
                        <div class="dropzone">
                            <div class="file-input">
                                <div class="file-preview">
                                    <div class="input-group file-caption-main">
                                        <div class="file-preview-frame">
                                            <div class="kv-file-content">
                                                <img src="{{$block->img_2_field->link}}?{{$block->img_2_field->cache_index}}" class="kv-preview-data file-preview-image"
                                                     title="{{$block->img_2_field->alt}}" alt="{{$block->img_2_field->alt}}">
                                            </div>
                                            <div class="file-thumbnail-footer">
                                                <div class="file-actions">
                                                    <input type="text" class="form-control alt-text" data-block="about"
                                                           data-type="images" data-id="0" data-name="alt"
                                                           value="{{$block->img_2_field->alt}}">
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
                                                   data-block="offers"
                                                   data-name="img_2"
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


            <div class="box box-success">
                <div class="box-header with-border">
                    <h3 class="box-title">Предложение №3</h3>
                </div>
                <div class="box-body">
                    <div class="form-group">
                        <label>Заголовок</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_3_title}}"
                               data-name="offer_3_title"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Текст под заголовком</label>
                        <textarea class="form-control text textarea--small" data-reg="true"
                                  data-name="offer_3_text"
                                  data-type="text"
                                  data-block="offers"
                                  data-id="0">{{$block->offer_3_text}}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Цена</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_3_price}}"
                               data-name="offer_3_price"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Старая цена (зачеркнута)</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_3_old_price}}"
                               data-name="offer_3_old_price"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Текст скидки</label>
                        <input class="form-control string"
                               type="text" placeholder=""
                               value="{{$block->offer_3_discount}}"
                               data-name="offer_3_discount"
                               data-type="string"
                               data-block="offers"
                               data-id="0">
                    </div>
                    <div class="form-group">
                        <label>Изображение (300x470 пикселей)</label>
                        <div class="dropzone">
                            <div class="file-input">
                                <div class="file-preview">
                                    <div class="input-group file-caption-main">
                                        <div class="file-preview-frame">
                                            <div class="kv-file-content">
                                                <img src="{{$block->img_3_field->link}}?{{$block->img_3_field->cache_index}}" class="kv-preview-data file-preview-image"
                                                     title="{{$block->img_3_field->alt}}" alt="{{$block->img_3_field->alt}}">
                                            </div>
                                            <div class="file-thumbnail-footer">
                                                <div class="file-actions">
                                                    <input type="text" class="form-control alt-text" data-block="about"
                                                           data-type="images" data-id="0" data-name="alt"
                                                           value="{{$block->img_3_field->alt}}">
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
                                                   data-block="offers"
                                                   data-name="img_3"
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
        </div>
    </div>
@endsection