<?php

namespace App\Services;

use App\Models\response;
use App\Models\ticket;
use App\Models\User;

class TicketService
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

        $tickets = Ticket::where('owner_id', $this->user->id)->get();

        if ($tickets->count() === 0) {
            return response()->json(['message' => 'You don\'t have any tickets yet, create one first'], 200);
        }

        $tickets->each(function ($ticket) {
            $ticket->responses = Response::where('ticket_id', $ticket->id)
                ->orderBy('created_at', 'desc')
                ->get();
        });

        return response()->json($tickets, 200);
    }

    public function getAll()
    {
        $tickets = ticket::all();
        if ($tickets->count() === 0) {
            return response()->json(['message' => 'There are no tickets yet'], 200);
        }
        return $tickets;
    }

    public function create(array $data)
    {
        if (ticket::where('id', $this->user->id)->count() < 3) {
            return ticket::create($data);
        }
        return response()->json(['message' => 'You can\'t create more than 3 tickets'], 403);
    }

    public function show(ticket $ticket)
    {
        return $ticket;
    }

    public function store(array $data)
    {
        return ticket::create($data);
    }

    public function update($ticket, array $data)
    {
        $ticket->update($data);
        return response()->json(['message' => 'Ticket updated successfully'], 200);
    }

    public function delete($ticket)
    {
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted successfully'], 200);
    }
}

