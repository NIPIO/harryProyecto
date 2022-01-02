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


    
    public function nuevoCliente(Request $request) {

        $req = $request->all();

        $marca = new Clientes();
        $marca->nombre = $req['nombre'];
        $marca->telefono = $req['telefono'];
        $marca->email = $req['email'];
        $marca->save();

        return response()->json(['status' => 200]);
    }
}
