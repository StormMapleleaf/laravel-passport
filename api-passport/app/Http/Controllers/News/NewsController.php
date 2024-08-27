<?php

namespace App\Http\Controllers\News;

use Illuminate\Http\Request;
use App\Models\News;
use App\Http\Controllers\Controller;

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
}