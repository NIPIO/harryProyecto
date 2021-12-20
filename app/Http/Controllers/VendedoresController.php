<?php

namespace App\Http\Controllers;

use App\Models\Vendedores;
use Illuminate\Http\Request;

class VendedoresController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $vendedores = Vendedores::all();
        return response()->json(['status' => 200, 'data' => $vendedores]);
    }
}
