<?php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Photo; // 假设你有一个 Photo 模型

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $userId = $request->query('user_id'); // 从请求中获取 user_id 参数

        // 验证 user_id 是否存在
        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        // 查找用户
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // 准备用户数据，包括照片
        $userData = [
            'id' => $user->user_id,
            'username' => $user->username,
            'email' => $user->email,
            // 'photos' => $this->getUserPhotos($user->user_id), // 获取用户的照片
        ];

        return response()->json($userData);
    }

    // private function getUserPhotos($userId)
    // {
    //     // 从数据库中获取用户的照片
    //     return Photo::where('user_id', $userId)->pluck('photo_url')->toArray(); // 返回照片 URL 列表
    // }
}
