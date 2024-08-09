<?php

namespace App\Http\Controllers;

use App\Models\ClientApplication;
use Illuminate\Http\Request;
use App\Models\Client;
use Laravel\Passport\ClientRepository;

class ClientApplicationController extends Controller
{
    public function index()
    {
        $applications = ClientApplication::all();
        return response()->json($applications);
    }

    public function store(Request $request)
    {
    
        $request->validate([
            'applicant' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'client_name' => 'required|string|max:255',
            'callback_url' => 'required|string|max:2048',
            //  'status' => 'required|integer'
        ]);
        
        $application = ClientApplication::create([
            'applicant' => $request->applicant,
            'phone_number' => $request->phone_number,
            'client_name' => $request->client_name,
            'callback_url' => $request->callback_url,
            'status' => $request->status,
        ]);

        return response()->json($application, 201);
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:client_applications,id',
            'status' => 'required|integer|in:1,2,3'
        ]);
    
        $application = ClientApplication::findOrFail($request->id);
        $application->status = $request->status;
        $application->save();
        if ($request->status === 2) {
            $clientRepository = app(ClientRepository::class);
            $clientRepository->create(
                $application->client_name,
                $application->callback_url
            );
        }
    
    
        return response()->json($application);
    }
    
}
