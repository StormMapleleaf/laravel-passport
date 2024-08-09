<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhotoController extends Controller
{
    public function index()
    {
        $photos = Photo::where('user_id', Auth::id())->get();
        return response()->json($photos);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'image_url' => 'required'
        ]);

        $photo = Photo::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'image_url' => $request->image_url
        ]);

        return response()->json($photo, 201);
    }
}
