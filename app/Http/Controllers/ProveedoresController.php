<?php

namespace App\Http\Controllers;

use App\Models\Proveedores;
use Illuminate\Http\Request;

class ProveedoresController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $proveedores = Proveedores::all();
        return response()->json(['status' => 200, 'data' => $proveedores]);
    }


    public function nuevoProveedor(Request $request) {

        $req = $request->all();

        $proveedor = new Proveedores();
        $proveedor->nombre = $req['nombre'];
        $proveedor->save();

        return response()->json(['status' => 200]);
    }

    
}
