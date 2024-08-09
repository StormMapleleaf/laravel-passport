<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// $router->options('/api/user', function() {
//     return response()->json(['status' => 'ok'], 200)
//                      ->header('Access-Control-Allow-Origin', '*')
//                      ->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
//                      ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// });


// $router->group(['middleware' => 'cors'], function () use ($router) {
//     $router->group(['prefix' => 'api'], function () use ($router) {
//         $router->post('register', 'AuthController@register');
//         $router->post('login', 'AuthController@login');
       
//         $router->group(['middleware' => 'auth'], function () use ($router) {
//             $router->get('photos', 'PhotoController@index');
//             $router->post('photos', 'PhotoController@store');
//         });
//     });
//     // routes/web.php

// });

// $router->group(['middleware' => ['cors']], function () use ($router) {

//     $router->get('/user', 'UserController@getUser');
    
// });

$router->post('/api/login', 'AuthController@login');
$router->post('/api/user', 'UserController@getUser');