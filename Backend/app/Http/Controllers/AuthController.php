<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     title="API",
 *     version="1.0",
 * )
 */
class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @OA\Post(
     *     path="/login",
     *     tags={"Auth"},
     *     summary="Login",
     *     description="Login",
     *     @OA\RequestBody(
     *         description="User credentials",
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="password", type="string", example="secret"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYyNzk1MjU5NCwiZXhwIjoxNjI4MDQyOTk0LCJuYmYiOjE2Mjc5NTI1OTQsImp0aSI6IjRkMjA4MmFmYmM1ZjllYzciLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaGFuIjoiMjMwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="invalid credentials",
     *     ),
     * )
     */
    public function login(Request $request)
    {
        return $this->userService->login($request->only('email', 'password'));
    }

    /**
     * @OA\Post(
     *     path="/signup",
     *     summary="Signup",
     *     tags={"Auth"},
     *     description="Signup",
     *     @OA\RequestBody(
     *         description="User data",
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="password", type="string", example="secret"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYyNzk1MjU5NCwiZXhwIjoxNjI4MDQyOTk0LCJuYmYiOjE2Mjc5NTI1OTQsImp0aSI6IjRkMjA4MmFmYmM1ZjllYzciLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaGFuIjoiMjMwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="invalid data",
     *     ),
     * )
     */
    public function signup(Request $request)
    {
        return $this->userService->signup($request->all());
    }

    /**
     * @OA\Get(
     *     path="/logout",
     *     summary="Logout",
     *     tags={"Auth"},
     *     description="Logout",
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *     ),
     * )
     */
    public function logout()
    {
        return $this->userService->logout();
    }

    public function me(){
        return $this->userService->me();
    }
}

