<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Client;
use Laravel\Passport\ClientRepository;
use Illuminate\Support\Facades\Auth;


class ClientController extends Controller
{
    public function list(Request $request)
    {
        $request->validate([
            'current' => 'integer|nullable',
            'pageSize' => 'integer|nullable',
        ]);
        
        // 获取当前页码，默认为 1
        $current = $request->input('current', 1);
        
        // 获取每页显示的记录数，默认为 10
        $pageSize = $request->input('pageSize', 10);
        
        // 排除特定的 id
        $excludedIds = [
            '9cab4d79-1dff-4bd2-ab5b-3ec6bc05b2fa',
            '9cab4d79-188a-4959-80e3-e532be230b26'
        ];
        
        // 使用分页查询并排除特定的 id,
        $clients = Client::whereNotIn('id', $excludedIds)
            ->where('revoked', '!=', 1)
            ->paginate($pageSize, ['*'], 'page', $current);
        
            // 返回用户列表和分页信息
        return response()->json([
            'data' => $clients->items(),
            'total' => $clients->total(),
            'current' => $clients->currentPage(),
            'pageSize' => $clients->perPage(),
        ]);
    }
    // 创建一个新的客户端
    public function create(Request $request)
    {
        // 验证字段
        $request->validate([
            'name' => 'required',
            'redirect' => 'required|url',
        ]);
        $clientRepository = app(ClientRepository::class);
        $client = $clientRepository->create(
             $request->name, $request->redirect
        );
        // exit;
        return response()->json($client);
    }
    
    // 更新客户端
    public function update(Request $request)
    {
        // 验证字段
        $request->validate([
            'id' => 'required|uuid', // 确保 id 是 UUID 格式
            'name' => 'required',
            'redirect' => 'required|url',
        ]);
    
        // 获取 Client 实例
        $clientRepository = app(ClientRepository::class);
        $client = $clientRepository->find($request->id);
    
        if (!$client) {
            return response()->json(['error' => 'Client not found'], 404);
        }
    
        // 更新 Client
        $updatedClient = $clientRepository->update(
            $client, $request->name, $request->redirect
        );
    
        return response()->json($updatedClient);
    }

    // 删除客户端
    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|array',
            'id.*' => 'uuid',
        ]);

        $clientRepository = app(ClientRepository::class);
        foreach ($request->id as $id) {
            $client = $clientRepository->find($id);
            if ($client) {
                $clientRepository->delete($client);
            }
        }

        return response()->json(['msg' => '删除成功']);
    }

    
}
