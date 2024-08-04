<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use App\Http\Controllers\AuthorizeController;
use App\Http\Controllers\GitHubController; // Add this line to import the GitHubController
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout']) -> middleware('auth:api');

// Route::get('/auth/github', [GitHubController::class, 'redirectToProvider']);
// Route::get('/auth/github/callback', [GitHubController::class, 'handleProviderCallback']);


Route::get('/oauth/authorize', [AuthorizeController::class, 'authorize']);
    // ->middleware('auth:api');
Route::post('/oauth/token', [AuthorizeController::class, 'issueToken']);
// Route::post('/oauth/token', [AccessTokenController::class, 'issueToken']);