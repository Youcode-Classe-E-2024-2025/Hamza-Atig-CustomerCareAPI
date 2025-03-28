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
        $this->userRepository->create($data);
        
        return response()->json([
            'message' => 'User registered successfully!'
        ], 201);
    }

    public function login(array $data)
    {
        $user = $this->userRepository->where('email', $data['email'])->first();
        
        if ($user && password_verify($data['password'], $user->password)) {
            return response()->json([
                'token' => $this->Token($user, 'LoginToken')
            ], 200);
        }
        
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function Token($user, $token)
    {
        return $user->createToken($token)->plainTextToken;
    }

    public function logout()
    {
        auth()->logout();
    }

    public function me()
    {
        return $this->user;
    }
}

