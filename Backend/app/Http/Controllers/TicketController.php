<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Services\TicketService;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Tickets",
 *     description="API Endpoints for Tickets"
 * )
 *
 * @OA\Schema(
 *     schema="Ticket",
 *     type="object",
 *     title="Ticket",
 *     description="Ticket model",
 *     required={"title", "description", "status", "owner_id"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Server Down"),
 *     @OA\Property(property="description", type="string", example="The server is not responding"),
 *     @OA\Property(property="status", type="string", enum={"open", "pending", "closed"}, example="open"),
 *     @OA\Property(property="tacked_at", type="string", format="date", nullable=true, example="2025-03-21"),
 *     @OA\Property(property="closed_at", type="string", format="date", nullable=true, example="2025-03-25"),
 *     @OA\Property(property="owner_id", type="integer", example=10),
 *     @OA\Property(property="agent_id", type="integer", nullable=true, example=15)
 * )
 */
class TicketController extends Controller
{
    protected $ticketService;

    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;
    }

    /**
     * @OA\Get(
     *     path="/tickets",
     *     summary="Get all tickets",
     *     tags={"Tickets"},
     *     description="Get all tickets",
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Ticket"))
     *     ),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Not Found"),
     *     security={{"bearerAuth"}}
     * )
     */
    public function index()
    {
        return $this->ticketService->index();
    }

    /**
     * @OA\Post(
     *     path="/tickets",
     *     summary="Create a ticket",
     *     tags={"Tickets"},
     *     description="Create a ticket",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Ticket")
     *     ),
     *     @OA\Response(response=201, description="successful operation", @OA\JsonContent(ref="#/components/schemas/Ticket")),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=400, description="Bad Request"),
     *     security={{"bearerAuth"}}
     * )
     */
    public function store(Request $request)
    {
        return $this->ticketService->create($request->all());
    }

    /**
     * @OA\Put(
     *     path="/tickets/{ticket}",
     *     summary="Update a ticket",
     *     tags={"Tickets"},
     *     description="Update a ticket",
     *     @OA\Parameter(in="path", name="ticket", required=true, description="Ticket ID", @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/Ticket")),
     *     @OA\Response(response=200, description="successful operation", @OA\JsonContent(ref="#/components/schemas/Ticket")),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=400, description="Bad Request"),
     *     @OA\Response(response=404, description="Not Found"),
     *     security={{"bearerAuth"}}
     * )
     */
    public function update(Request $request, Ticket $ticket)
    {
        return $this->ticketService->update($ticket, $request->all());
    }

    /**
     * @OA\Delete(
     *     path="/tickets/{ticket}",
     *     summary="Delete a ticket",
     *     tags={"Tickets"},
     *     description="Delete a ticket",
     *     @OA\Parameter(in="path", name="ticket", required=true, description="Ticket ID", @OA\Schema(type="integer")),
     *     @OA\Response(response=204, description="successful operation"),
     *     @OA\Response(response=401, description="Unauthorized"),
     *     @OA\Response(response=404, description="Not Found"),
     *     security={{"bearerAuth"}}
     * )
     */
    public function destroy(Ticket $ticket)
    {
        return $this->ticketService->delete($ticket);
    }

/**
 * @OA\Get(
 *     path="/alltickets",
 *     summary="Get all tickets",
 *     tags={"Tickets"},
 *     description="Get all tickets",
 *     @OA\Response(
 *         response=200,
 *         description="successful operation",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Ticket"))
 *     ),
 *     @OA\Response(response=401, description="Unauthorized"),
 *     @OA\Response(response=404, description="Not Found"),
 *     security={{"bearerAuth"}}
 * )
 */
public function getAll()
{
    return $this->ticketService->getAll();
}

}
