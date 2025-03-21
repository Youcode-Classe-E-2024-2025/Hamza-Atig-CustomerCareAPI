<?php

namespace App\Http\Controllers;

use App\Models\response;
use App\Services\ResponceService;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    protected $responceService;
    
    public function __construct(ResponceService $responceService)
    {
        $this->responceService = $responceService;  
    }

    public function index()
    {
        return $this->responceService->index();
    }

    public function store(Request $request)
    {
        return $this->responceService->create($request->all());
    }

    public function show(response $responce)
    {
        return $this->responceService->show($responce);
    }

    public function update(Request $request, response $responce)
    {
        return $this->responceService->update($responce, $request->all());
    }

    public function destroy(response $responce)
    {
        return $this->responceService->delete($responce);
    }
}
