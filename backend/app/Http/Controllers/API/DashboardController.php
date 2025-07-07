<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\DashboardSettings;
use App\Models\UserHobby;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function getDashboard(Request $request)
    {
        $user = $request->user();
        $hobbies = $user->hobbies()->where('is_active', true)->get();
        $settings = $user->dashboardSettings()->pluck('setting_value', 'setting_key');

        return response()->json([
            'user' => $user,
            'hobbies' => $hobbies,
            'settings' => $settings
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'daily_phrase' => 'nullable|string|max:255',
            'current_mood' => 'nullable|string|max:50',
            'color_preferences' => 'nullable|array',
            'dark_mode' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();
        $user->update($request->only([
            'daily_phrase', 
            'current_mood', 
            'color_preferences', 
            'dark_mode'
        ]));

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }

    public function getHobbies(Request $request)
    {
        $hobbies = $request->user()->hobbies()->get();
        return response()->json(['hobbies' => $hobbies]);
    }

    public function createHobby(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
            'goal' => 'nullable|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $hobby = $request->user()->hobbies()->create($request->all());

        return response()->json([
            'message' => 'Hobby created successfully',
            'hobby' => $hobby
        ], 201);
    }

    public function updateHobby(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'icon' => 'nullable|string|max:50',
            'color' => 'nullable|string|max:7',
            'progress' => 'nullable|integer|min:0',
            'goal' => 'nullable|integer|min:1',
            'is_active' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $hobby = $request->user()->hobbies()->findOrFail($id);
        $hobby->update($request->all());

        return response()->json([
            'message' => 'Hobby updated successfully',
            'hobby' => $hobby
        ]);
    }

    public function deleteHobby(Request $request, $id)
    {
        $hobby = $request->user()->hobbies()->findOrFail($id);
        $hobby->delete();

        return response()->json([
            'message' => 'Hobby deleted successfully'
        ]);
    }

    public function updateSetting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'key' => 'required|string|max:255',
            'value' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $setting = DashboardSettings::updateOrCreate([
            'user_id' => $request->user()->id,
            'setting_key' => $request->key,
        ], [
            'setting_value' => $request->value,
        ]);

        return response()->json([
            'message' => 'Setting updated successfully',
            'setting' => $setting
        ]);
    }
}
