<?php

namespace App\Http\Controllers;

use App\Models\Marcas;
use Illuminate\Http\Request;

class MarcasController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $marcas = Marcas::all();
        return response()->json(['status' => 200, 'data' => $marcas]);
    }
}
