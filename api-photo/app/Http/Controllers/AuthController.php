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
        $this->validate($request, [
            'username' => 'required|unique:users',
            'password' => 'required',
            'email' => 'required|unique:users|email',
        ]);

        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    public function login(Request $request)
{
    $this->validate($request, [
        'username' => 'required',
        'password' => 'required',
    ]);

    $credentials = $request->only('username', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = Str::random(60);

        // 你可能需要将token保存到数据库
        $user->api_token = $token;
        // $user->save();

        return response()->json(['token' => $token], 200);
    } else {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

}
