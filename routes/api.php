<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('login', [AuthController::class, 'login'])->name('login')->middleware('guest');
Route::post('signup', [AuthController::class, 'signup']);   

Route::apiResource('tickets', TicketController::class)->middleware('auth:sanctum');