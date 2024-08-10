<?php

// app/Models/Photo.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'url'];

    // 你可以定义与 User 模型的关系
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
