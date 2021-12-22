<?php

namespace App\Http\Controllers;

use App\Models\CtaCte;
use App\Models\Productos;
use Illuminate\Http\Request;

class CtaCteController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $cuentas = CtaCte::all();
        return response()->json(['status' => 200, 'data' => $cuentas]);
    }
}
