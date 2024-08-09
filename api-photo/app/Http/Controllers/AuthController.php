<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    public function register(Request $request)
{
    // 验证请求数据
    $this->validate($request, [
        'username' => 'required|unique:users',
        'email' => 'required|unique:users|email',
        'password' => 'required',
    ]);

    // 创建新的用户实例
    $user = new User();
    $user->username = $request->input('username');
    $user->email = $request->input('email');
    
    // 使用 bcrypt 对密码进行加密
     $user->password = $request->input('password');

    // 保存用户到数据库
    $user->save();

    // 返回 JSON 响应
    return response()->json($user, 201);
}

public function login(Request $request)
{
    // 验证请求数据
    $this->validate($request, [
        'email' => 'required',
        'password' => 'required',
    ]);

    // 查找用户
    $user = User::where('email', $request->input('email'))->first();

    // 检查用户是否存在并且密码是否匹配
    if ($user && $user->password === $request->input('password')) {
        // 生成随机token
        // $token = Str::random(60);

        // 保存token到数据库（你需要确保数据库有api_token字段）
        // $user->api_token = $token;
        $user->save();

        return response()->json($user);
    } else {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}



}
