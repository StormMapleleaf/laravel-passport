<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use App\Models\News;
use Illuminate\Support\Facades\Log;

class ProcessDailyMessages extends Command
{
    protected $signature = 'messages:process-daily';
    protected $description = 'Process Redis messages and store them into the database daily at midnight';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // 定义 Redis 列表的键名和阈值
        $listKey = 'message_queue';
        $threshold = 5;

        // 获取列表中的所有消息
        $messages = Redis::lrange($listKey, 0, -1);

        // 如果有消息，则处理并存储到数据库
        if (count($messages) > 0) {
            foreach ($messages as $message) {
                // 存入数据库
                News::create(['title' => $message]);
                Log::info('Stored message in news: ' . $message);
            }

            // 清空 Redis 列表中的消息
            Redis::del($listKey);

            // 存入数据库后缓存前两页数据到 Redis
            $this->cacheNewsPages();
        } else {
            Log::info('No messages to process');
        }
    }

    protected function cacheNewsPages()
    {
        // 获取最新的 20 条数据
        $latestNews = News::orderBy('created_at', 'desc')->take(20)->get();

        // 缓存到 Redis 中
        Redis::set('news:latest', json_encode($latestNews));

        Log::info('Cached the latest 20 news items in Redis');
    }
}

