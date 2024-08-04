<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Laravel\Passport\Http\Controllers\AuthorizationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthorizeController extends Controller
{
    public function authorize(Request $request)
    {
        // 确保请求中必须包含 client_id, redirect_uri, response_type
        $request->validate([
            'client_id' => 'required',
            'redirect_uri' => 'required|url',
            // 'response_type' => 'required|in:code', // 只允许授权码类型
        ]);
        // 验证用户是否已登录
        // if (!Auth::check()) {
        //     return response()->json(['message' => '用户未授权'], 401);
        // }
        // 获取用户
        $user = Auth::user();

        $client = $this->getClient($request);

        $authorizationCode = $this->createAuthorizationCode($user, $client, $request);
        // 重定向到 redirect_uri 并附加授权码
        return redirect($request->redirect_uri . '?code=' . $authorizationCode);
    }
    protected function getClient(Request $request)
    {

        return \Laravel\Passport\Client::find($request->client_id);
    }
    protected function createAuthorizationCode($user, $client, $request)
    {

        $code = 'generated_code'; 
        return $code;
    }
}