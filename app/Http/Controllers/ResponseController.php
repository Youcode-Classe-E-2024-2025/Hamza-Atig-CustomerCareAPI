<?php

namespace App\Http\Controllers;

use App\Models\response;
use App\Services\ResponceService;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Responses",
 *     description="API Endpoints for Responses"
 * )
 */
class ResponseController extends Controller
{
    protected $responceService;
    
    public function __construct(ResponceService $responceService)
    {
        $this->responceService = $responceService;  
    }

    /**
     * @OA\Get(
     *     path="/responses",
     *     tags={"Responses"},
     *     summary="Get list of responses",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="array", @OA\Items(type="object"))
     *     )
     * )
     */
    public function index()
    {
        return $this->responceService->index();
    }

    /**
     * @OA\Post(
     *     path="/responses",
     *     tags={"Responses"},
     *     summary="Create a response",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Response created successfully",
     *         @OA\JsonContent(type="object")
     *     )
     * )
     */
    public function store(Request $request)
    {
        return $this->responceService->create($request->all());
    }

    /**
     * @OA\Get(
     *     path="/responses/{id}",
     *     tags={"Responses"},
     *     summary="Get a response",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Response not found"
     *     )
     * )
     */
    public function show(response $responce)
    {
        return $this->responceService->show($responce);
    }

    /**
     * @OA\Put(
     *     path="/responses/{id}",
     *     tags={"Responses"},
     *     summary="Update a response",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Response updated successfully",
     *         @OA\JsonContent(type="object")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Response not found"
     *     )
     * )
     */
    public function update(Request $request, response $responce)
    {
        return $this->responceService->update($responce, $request->all());
    }

    /**
     * @OA\Delete(
     *     path="/responses/{id}",
     *     tags={"Responses"},
     *     summary="Delete a response",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Response deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Response not found"
     *     )
     * )
     */
    public function destroy(response $responce)
    {
        return $this->responceService->delete($responce);
    }
}

