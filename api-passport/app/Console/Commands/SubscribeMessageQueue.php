<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use App\Models\News; // 确保你有相应的模型

class SubscribeMessageQueue extends Command
{
    protected $signature = 'subscribe:message_queue';
    protected $description = 'Subscribe to message queue and sync messages to database';

    public function handle()
    {
        Redis::subscribe(['message_queue'], function ($message) {
            $this->syncToDatabase($message);
        });
    }

    protected function syncToDatabase($message)
    {
        $messageData = json_decode($message, true);

        // 将消息保存到 news 表中
        News::create([
            'title' => $messageData['title'],
            'created_at' => now(),
        ]);
    }
}

