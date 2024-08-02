<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
// use Illuminate\Auth\AuthenticationException;

class AuthController extends Controller
{
    //注册
    public function register (Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()){
            return response(['errors'=>$validator->errors()->all()], 422);
        }

        $user = User::Create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 200);
    }

    //登录
    public function login(Request $request){

        $credentials = $request->only('email', 'password');

        // 尝试验证用户凭据
        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        $token = $user->api_token = Str::random(60);
        
        return response() -> json(['token' => $token]);
    }

    //登出
    public function logout(){
        auth()->logout();
        return response()->json(['message' => '成功退出登录']);
    }
}
