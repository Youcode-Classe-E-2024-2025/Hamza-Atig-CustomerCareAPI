<?php

namespace App\repository;

use App\Models\User;

class UserRepository
{
    /**
     * Create a new class instance.
     */
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function create(array $data)
    {
        return $this->user->create($data);
    }

    public function where($column, $value)
    {
        return $this->user->where($column, $value);
    }
}

