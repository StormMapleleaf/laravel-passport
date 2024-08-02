<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class GitHubController extends Controller
{
    public function redirectToProvider()
    {
        return Socialite::driver('github')->redirect();
    }
    public function handleProviderCallback()
    {
        $githubUser = Socialite::driver('github')->user();
         // 使用GitHub ID或Email查找用户
        $user = User::where('github_id', $githubUser->getId())
        ->orWhere('email', $githubUser->getEmail())
        ->first();
        if (!$user) {
            // 如果用户不存在，创建新用户
            $user = User::create([
                'name' => $githubUser->getName() ?: $githubUser->getNickname(),
                'email' => $githubUser->getEmail(),
                'github_id' => $githubUser->getId(),
                'password' => bcrypt(Str::random(16)), // 生成随机密码
            ]);
        }
        Auth::login($user, true);
        // 生成访问令牌
        $token = $user->Str::random(60)->accessToken;
        // 返回用户信息和令牌
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }
}
