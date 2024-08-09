<?php

namespace App\Http\Controllers\User;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function signup(Request $request){
        $request->validate([
            'name'=>'required',
            'email'=>'required',
            'password'=>'required'
        ]);
        $name=$request->input('name');
        $email=$request->input('email');
        $password=$request->input('password');
        $check=User::where('email',$email)->first();
        if($check){
            return response()->json(['msg'=>'此邮箱已被占用！']);
        }
        $user = User::create(['name' => $name, 'email' => $email, 'password' => $password]);
        if($user){
            return response()->json(['msg'=>'注册成功']);
        }else{
            return response()->json(['msg'=>'注册失败']);
        }

    }

    public function login(Request $request) {
        // 验证请求数据
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
    
        // 查找用户
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('personal token');
            return response()->json(['msg' => '登录成功', 'data' => $token]);
        } else {
            // 登录失败
            return response()->json(['msg' => '登录失败'], 401);
        }
    }

    public function info(Request $request){
        $userinfo=$request->user('api');
        return response()->json(['data'=>$userinfo]);
    }

    public function logout(Request $request){
        $user = $request->user('api');
        if ($user) {
            $user->token()->revoke();
            return response()->json(['msg' => '成功退出登录']);
        } else {
            return response()->json(['msg' => '用户未认证'], 401);
        }
    }

    public function list(Request $request)
    {
        $request->validate([
            'current' => 'integer|nullable',
            'pageSize' => 'integer|nullable',
        ]);
        
        $current = $request->input('current', 1);
        $pageSize = $request->input('pageSize', 10);

            // 查询用户列表
        $users = User::paginate($pageSize, ['*'], 'page', $current);

        // 返回用户列表和分页信息
        return response()->json([
            'data' => $users->items(),
            'current' => $users->currentPage(),
            'pageSize' => $users->perPage(),
            'total' => $users->total(),
        ]);
        
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'name' => 'string',
            'email' => 'email',
            'password' => 'string',
        ]);
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json(['msg' => '更新成功']);
    }

    public function delete(Request $request)
    {
       // 数据为id列表
        $request->validate([
            'id' => 'required|array',
        ]);
        $ids = $request->input('id');
        User::destroy($ids);
        return response()->json(['msg' => '删除成功']);
    }

    
}
