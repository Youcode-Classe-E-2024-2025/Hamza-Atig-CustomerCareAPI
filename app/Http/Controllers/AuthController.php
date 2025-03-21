<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(Request $request)
    {
        return $this->userService->login($request->only('email', 'password'));
    }

    public function signup(Request $request)
    {
        return $this->userService->signup($request->all());
    }

    public function logout()
    {
        return $this->userService->logout();
    }

}