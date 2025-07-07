<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'getDashboard']);
    Route::put('/profile', [DashboardController::class, 'updateProfile']);
    
    // Hobbies routes
    Route::get('/hobbies', [DashboardController::class, 'getHobbies']);
    Route::post('/hobbies', [DashboardController::class, 'createHobby']);
    Route::put('/hobbies/{id}', [DashboardController::class, 'updateHobby']);
    Route::delete('/hobbies/{id}', [DashboardController::class, 'deleteHobby']);
    
    // Settings routes
    Route::post('/settings', [DashboardController::class, 'updateSetting']);
});
