<?php

use App\Http\Controllers\ResponseController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('signup', [AuthController::class, 'signup'])->name('signup');   

Route::apiResource('tickets', TicketController::class)->middleware('auth:sanctum');
Route::apiResource('responses', ResponseController::class)->middleware('auth:sanctum');

Route::get('me', [AuthController::class, 'me'])->middleware('auth:sanctum');

Route::get('alltickets', [TicketController::class, 'getAll'])->middleware('auth:sanctum');