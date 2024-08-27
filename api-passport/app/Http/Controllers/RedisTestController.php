<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;
use Illuminate\Http\Request;

class RedisTestController extends Controller
{
    public function testConnection()
    {
        try {
            // 设置测试键
            Redis::set('test_key', 'Hello Laravel');
            // 获取测试键
            $value = Redis::get('test_key');

            if ($value === 'Hello Laravel') {
                return response()->json(['status' => 'success', 'message' => 'Redis is connected']);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Redis connection failed']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Redis connection error: ' . $e->getMessage()]);
        }
    }
}
