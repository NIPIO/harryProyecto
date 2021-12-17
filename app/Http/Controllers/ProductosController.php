<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Responses\Json;

class ProductosController extends Controller
{
    public function __construct()
    {
    }

    public function indexProductos() {
        // return response()->json(['error' => true, "mensaje" => $mensaje]);
        return response()->json(['status' => 200, 'data' => 'data']);
    }
}
