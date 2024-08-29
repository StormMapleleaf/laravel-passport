<?php

namespace App\Http\Controllers\News;

use Illuminate\Http\Request;
use App\Models\News;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;

class NewsListController extends Controller
{
    public function index(Request $request)
    {
         // 获取传入的 latestNewsId
        $latestNewsId = $request->input('latest');

        // 如果 latestNewsId 为空，获取最新的新闻 ID
        if ($latestNewsId == 0) {
            $latestNewsId = News::orderBy('id', 'desc')->first()->id;
        }

        // 当前页码
        $currentPage = $request->input('page', 1);

        // 计算新闻 ID 范围
        $startId = $latestNewsId - ($currentPage - 1) * 5;
        // dd($startId);
        $endId = $startId - 4;

        // 查询新闻列表
        $newsList = News::whereBetween('id', [$endId, $startId])
                        ->orderBy('id', 'desc')
                        ->get();

        // 计算总页数
        $totalRecords = $latestNewsId;
        $totalPages = ceil($totalRecords / 5);

        return response()->json([
            'news' => $newsList,
            'latestNewsId' => $latestNewsId,
            'currentPage' => $currentPage,
            'totalPages' => $totalPages,
        ]);
    }
}
