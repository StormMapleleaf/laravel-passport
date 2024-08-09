<?php
namespace App\Http\Middleware;
use Closure;
class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        
        // 添加 CORS 响应头
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        // 处理预检请求
        if ($request->getMethod() === "OPTIONS") {
            return response()->json(['status' => 'ok'], 200)
                             ->header('Access-Control-Allow-Origin', '*')
                             ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                             ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }
        return $response;
    }
}