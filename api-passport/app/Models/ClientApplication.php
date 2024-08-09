<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'applicant',
        'phone_number',
        'client_name',
        'callback_url',
        'status',
    ];

    public $timestamps = false; // 禁用时间戳
}
