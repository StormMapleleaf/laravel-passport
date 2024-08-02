<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GitHubController; // Add this line to import the GitHubController

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']) -> middleware('auth:api');

Route::get('/auth/github', [GitHubController::class, 'redirectToProvider']);
Route::get('/auth/github/callback', [GitHubController::class, 'handleProviderCallback']);