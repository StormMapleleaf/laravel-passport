<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Log;
use App\Models\News;
//php artisan subscribe:message_queue
class MessageController extends Controller
{
    protected $listKey = 'message_queue';

    public function sendMessage(Request $request)
    {
        // 将标题包装在一个数组中，保证发布的消息是一个包含 title 键的 JSON 对象
        $messageData = [
            'title' => $request->input('title')
        ];
    
        // 将消息编码为 JSON 格式并发布到 Redis
        Redis::publish($this->listKey, json_encode($messageData));
    
        return response()->json(['status' => 'Message sent']);
    }
    

//     // 检查消息数量并处理
//     protected function checkThreshold()
//     {
//         $count = Redis::llen($this->listKey);
//         if ($count >= $this->threshold) {
//             $this->processMessages();
//         }
//     }

//     // 处理消息并存入数据库
//     protected function processMessages()
//     {
//         $messages = Redis::lrange($this->listKey, 0, $this->threshold - 1);
//         // 清空列表中的消息
//         Redis::ltrim($this->listKey, $this->threshold, -1);

//         foreach ($messages as $message) {
//             // 存入数据库
//             News::create(['title' => $message]);
//             Log::info('Stored message in news: ' . $message);
//         }

//         // 存入数据库后缓存前两页数据到 Redis
//         $this->cacheNewsPages();
//     }

//     // 缓存前两页的新闻数据到 Redis
//     protected function cacheNewsPages()
// {
//     // 获取最新的 20 条数据
//     $latestNews = News::orderBy('created_at', 'desc')->take(20)->get();

//     // 缓存到 Redis 中
//     Redis::set('news:latest', json_encode($latestNews));

//     Log::info('Cached the latest 20 news items in Redis');
// }

}
