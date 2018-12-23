<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/',                  'FrontController@getIndex');


Route::post('/captcha',          'Back\MailController@Captcha');
Route::post('/feedback/mail',    'Back\MailController@send');


Route::auth();
Route::group(['middleware' => 'auth', 'prefix' => 'adm'],function(){

    Route::get('/',         'AdminController@getIndex');

    Route::get('/all',                      'AdminController@getAll');
    Route::get('/about',                    'AdminController@getAbout');
    Route::get('/atmosphere',               'AdminController@getAtmosphere');
    Route::get('/reviews',                  'AdminController@getReviews');
    Route::get('/habit',                    'AdminController@getHabit');
    Route::get('/challenge',                'AdminController@getChallenge');
    Route::get('/excuses',                  'AdminController@getExcuses');
    Route::get('/offers',                   'AdminController@getOffers');
    Route::get('/meta',                     'AdminController@getMeta');
    Route::get('/post',                     'AdminController@getPost');
    Route::get('/scripts',                  'AdminController@getScripts');


    // Таксономия проекта. Визуальная зависимость данных.
    Route::get('/taxonomy', 'Back\TaxonomyController@showTaxonomy');

    // Служебные роуты
    Route::post('/save', 'Back\SaveController@save');

    // Создание нового элемента группы
    Route::post('/newItemRow', 'Back\GroupItemController@newRow');
    Route::post('/newItemBox', 'Back\GroupItemController@newBox');
    Route::post('/newImage', 'Back\GroupItemController@newImageItem');

    // Роут удаление элемента группы
    Route::post('/removeItem', 'Back\GroupItemController@removeItem');
});

