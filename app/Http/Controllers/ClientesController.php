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
        $clientes = Clientes::orderBy('id', 'DESC')->get();

        return response()->json(['status' => 200, 'data' => $clientes]);
    }


    
    public function nuevoCliente(Request $request) {

        $req = $request->all();

        $cliente = new Clientes();
        $cliente->nombre = $req['nombre'];
        $cliente->telefono = $req['telefono'];
        $cliente->email = $req['email'];
        $cliente->save();

        return response()->json(['status' => 200]);
    }


    public function editarCliente(Request $request) {
        $req = $request->all();
        Clientes::whereId($req['id'])->update([
            "nombre" => $req['nombre'],
            "email" => $req['email'],
            "telefono" => $req['telefono'],
        ]);
        return response()->json(['error' => false]);
    }
    
}
