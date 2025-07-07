<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHobby extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'icon',
        'color',
        'progress',
        'goal',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'progress' => 'integer',
        'goal' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
