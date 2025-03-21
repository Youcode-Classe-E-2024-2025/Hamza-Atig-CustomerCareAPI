<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class response extends Model
{
    protected $fillable = [
        'response',
        'ticket_id',
        'user_id',
        'agent_id'
    ];
}
