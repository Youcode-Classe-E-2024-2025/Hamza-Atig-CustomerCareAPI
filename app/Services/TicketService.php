<?php

namespace App\Services;

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
        $tickets = ticket::where('owner_id', $this->user->id)->get();
        if ($tickets->count() === 0) {
            return response()->json(['message' => 'You don\'t have any tickets yet, create one first'], 404);
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
        if ($ticket->user->id === $this->user->id) {
            return $ticket->update($data);
        }
        return response()->json(['message' => 'You can\'t update this ticket'], 403);
    }

    public function delete($ticket)
    {
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted successfully'], 200);
    }
}

