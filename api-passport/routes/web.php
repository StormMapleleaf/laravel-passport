<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/captcha', [App\Http\Controllers\CaptchaController::class, 'show']);
Route::get('/test', [App\Http\Controllers\RedisTestController::class, 'testConnection']);

