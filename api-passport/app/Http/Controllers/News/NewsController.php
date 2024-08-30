<?php

namespace App\Http\Controllers\News;

use Illuminate\Http\Request;
use App\Models\News;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;

class NewsController extends Controller
{
    /**
     * Store a newly created news title in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // 验证请求数据
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // 创建新的新闻记录
        $news = new News();
        $news->title = $validatedData['title'];
        $news->save();

        // 返回响应
        return response()->json(['message' => 'News created successfully', 'news' => $news], 201);
    }

    public function getLatestNewsFromRedis()
    {
        $news = Redis::get('news:latest');

        if ($news) {
            return response()->json(json_decode($news));
        } else {
            return response()->json(['message' => 'No news found in cache'], 404);
        }
    }

    public function newpublish(Request $request)
    {
        // dd(1);
        // 从请求中获取新闻标题
        $newsTitle = $request->input('title');

        // 将新闻标题添加到 Redis 列表中
        Redis::rpush('news_queue', $newsTitle);
        $this->handle();

        return response()->json(['status' => 'News added to queue successfully!']);
    }

    public function handle()
    {
        // $newsTitle = Redis::lpop('news_queue');
        // while ($newsTitle) {
            // 从 Redis 队列中弹出一个新闻标题
            $newsTitle = Redis::lpop('news_queue');

            
                // 存储到数据库中
                News::create([
                    'title' => $newsTitle,
                    // 'created_at' => now(),
                ]);

           
        // }
    }

}