<?php

// app/Http/Controllers/PhotoController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photo;

class PhotoController extends Controller
{
    public function getUserPhotos(Request $request)
    {
        $userId = 4;

        // 验证 user_id 是否存在
        if (!$userId) {
            return response()->json(['error' => 'User ID is required'], 400);
        }

        // 查询用户的所有照片
        $photos = Photo::where('user_id', $userId)->get();

        // 返回 JSON 响应
        return response()->json($photos);
    }
}
