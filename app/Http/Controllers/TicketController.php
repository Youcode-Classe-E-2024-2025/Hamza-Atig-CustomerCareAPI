<?php

namespace App\Http\Controllers;

use App\Models\ticket;
use App\Services\TicketService;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    protected $ticketService;
    
    public function __construct(TicketService $ticketService)
    {
        $this->ticketService = $ticketService;  
    }

    public function index()
    {
        return $this->ticketService->index();
    }

    public function store(Request $request)
    {
        return $this->ticketService->create($request->all());
    }

    public function update(Request $request, ticket $ticket)
    {
        return $this->ticketService->update($ticket, $request->all());
    }

    public function destroy(ticket $ticket)
    {
        return $this->ticketService->delete($ticket);
    }
}
