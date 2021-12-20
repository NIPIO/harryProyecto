<?php

namespace App\Http\Controllers;

use App\Models\Ventas;
use Illuminate\Http\Request;

class VentasController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $ventas = Ventas::all();
        return response()->json(['status' => 200, 'data' => $ventas]);
    }
}
