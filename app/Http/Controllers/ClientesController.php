<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use Illuminate\Http\Request;

class ClientesController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $clientes = Clientes::all();
        return response()->json(['status' => 200, 'data' => $clientes]);
    }
}
