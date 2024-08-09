<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\ClientApplicationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/oauth/clients', [
    'uses' => 'Laravel\Passport\Http\Controllers\ClientController@forUser',
    'middleware' => ['auth:api'],
]);

Route::prefix('user')->group(function () {
    Route::post('/signup', 'App\Http\Controllers\User\UserController@signup');
    Route::post('/login', 'App\Http\Controllers\User\UserController@login');
    Route::post('/info', 'App\Http\Controllers\User\UserController@info');
    Route::post('/logout', 'App\Http\Controllers\User\UserController@logout');

    Route::post('/list', 'App\Http\Controllers\User\UserController@list');
    Route::post('/update', 'App\Http\Controllers\User\UserController@update');
    Route::post('/delete', 'App\Http\Controllers\User\UserController@delete');
});

Route::prefix('client')->namespace('App\Http\Controllers\Auth')->group(function () {
    Route::post('/list', 'ClientController@list');
    Route::post('/create', 'ClientController@create');
    Route::post('/update', 'ClientController@update');
    Route::post('/delete', 'ClientController@delete');
});

Route::post('/applylist', 'App\Http\Controllers\ClientApplicationController@index');
Route::post('/applycreate','App\Http\Controllers\ClientApplicationController@store');
Route::post('/applyupdate','App\Http\Controllers\ClientApplicationController@update');