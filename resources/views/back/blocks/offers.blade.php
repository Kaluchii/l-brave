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
                </div>
            </div>
        </div>
    </div>
@endsection