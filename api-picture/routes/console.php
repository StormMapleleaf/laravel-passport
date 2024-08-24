<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('say:hello', function () {
    $this->comment('helloworldddddddd');
})->purpose('Output "helloworld" every 30 seconds');
 
$filePath  = './a.txt'; 

Schedule::command('say:hello')->everyTenSeconds()->appendOutputTo($filePath);;