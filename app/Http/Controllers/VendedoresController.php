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


    public function nuevoVendedor(Request $request) {

        $req = $request->all();

        $vendedor = new Vendedores();
        $vendedor->nombre = $req['nombre'];
        $vendedor->telefono = $req['telefono'];
        $vendedor->email = $req['email'];
        $vendedor->save();

        return response()->json(['status' => 200]);
    }

    
}
