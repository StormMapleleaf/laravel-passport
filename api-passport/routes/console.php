<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\ProcessNewsQueue;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('messages:process-daily')->dailyAt('00:00');

Artisan::command('publish:news',function(){
    $this->comment(ProcessNewsQueue::class);
});