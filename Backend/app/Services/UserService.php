<?php

namespace App\Services;

use App\repository\UserRepository;

class UserService
{
    protected $userRepository;
    protected $user;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->user = auth()->user();
    }

    public function signup(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function login(array $data)
    {
        $user = $this->userRepository->where('email', $data['email'])->first();
        
        if ($user && password_verify($data['password'], $user->password)) {
            return $this->Token($user, 'LoginToken');
        }
        
        return json_encode(['error' => 'Invalid credentials']);
    }

    public function Token($user, $token)
    {
        return $user->createToken($token)->plainTextToken;
    }

    public function logout()
    {
        auth()->logout();
    }
}

