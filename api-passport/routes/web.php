<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GitHubController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/github', [GitHubController::class, 'redirectToProvider']);
Route::get('/auth/github/callback', [GitHubController::class, 'handleProviderCallback']);