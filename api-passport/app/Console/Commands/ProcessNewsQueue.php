<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use App\Models\News; // 你的新闻模型

class ProcessNewsQueue extends Command
{
    protected $signature = 'queue:process-news';
    protected $description = 'Process news from Redis queue and store in database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        while (true) {
            // 从 Redis 队列中弹出一个新闻标题
            $newsTitle = Redis::lpop('news_queue');

            if ($newsTitle) {
                // 存储到数据库中
                News::create([
                    'title' => $newsTitle,
                    'created_at' => now(),
                ]);

                $this->info('News processed: ' . $newsTitle);
            } else {
                // 队列为空时休息一段时间
                sleep(1);
            }
        }
    }
}
