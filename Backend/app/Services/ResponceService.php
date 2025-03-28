<?php

namespace App\Services;

use App\Models\response;

class ResponceService
{
    protected $user;

    public function __construct()
    {
        $this->user = auth()->user();
    }

    public function index()
    {
        if (!$this->user) {
            return response()->json(['message' => 'Call to a member function tickets() on null'], 500);
        }
        $responces = response::where('user_id', $this->user->id)->get();
        if ($responces->count() === 0) {
            return response()->json(['message' => 'You don\'t have any responces yet, create one first'], 404);
        }
        return $responces;
    }

    public function create(array $data)
    {
        return response::create($data);
    }

    public function show(response $responce)
    {
        if (!$responce->id) {
            return response()->json(['message' => 'Responce not found'], 404);
        }
        return $responce;
    }

    public function update($responce, array $data)
    {
        $responce->update($data);
        return response()->json(['message' => 'Responce updated successfully'], 200);
    }

    public function delete($responce)
    {
        $responce->delete();
        return response()->json(['message' => 'Responce deleted successfully'], 200);
    }
}
