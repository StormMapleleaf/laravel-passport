<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use App\Http\Controllers\Controller;


class NewPublishController extends Controller
{
    public function newpublish(Request $request)
    {
        dd(1);
        // 从请求中获取新闻标题
        $newsTitle = $request->input('title');

        // 将新闻标题添加到 Redis 列表中
        Redis::rpush('news_queue', $newsTitle);

        return response()->json(['status' => 'News added to queue successfully!']);
    }
}
