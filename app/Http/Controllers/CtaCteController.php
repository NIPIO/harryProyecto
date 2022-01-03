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
        $cuentas = CtaCte::with('proveedor')->get();
        return response()->json(['status' => 200, 'data' => $cuentas]);
    }


    
    public function nuevaCtaCte(Request $request) {

        $req = $request->all();
        $venta = new CtaCte();
        $venta->proveedor_id = $req['nombre'];
        $venta->saldo = $req['saldo'];
        $venta->save();

        return response()->json(['status' => 200]);
    }

    
}
