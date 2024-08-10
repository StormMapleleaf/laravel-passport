<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 使用 Validator 进行验证
        
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);
      
        // 检查验证是否失败
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // dd(1);
        // 创建用户
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json(['message' => 'User successfully registered', 'user' => $user], 201);
    }
    public function login(Request $request)
    {
        // 验证请求数据
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        return response()->json($user, 200);
    }



}
