<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Responses\Json;
use App\Models\Productos;

class ProductosController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $productos = Productos::all();
        return response()->json(['status' => 200, 'data' => $productos]);
    }


    public function nuevoProducto(Request $request) {
dd($request);
        $producto = new Productos();
        // $plantilla->plaFecReg = now()->toDateTimeString();
        // $plantilla->plaNombre = $request['plaNombre'];
        // $plantilla->plaDescripcion = $request['plaDescripcion'];
        // $plantilla->orgID = $request['orgID'];
        // $plantilla->comID = $request['comID'];
        // $plantilla->fplID = $request['fplID'];
        // $plantilla->splID = $request['splID'] ?? null;
        // $plantilla->save();


        return response()->json(['status' => 200, 'data' => $productos]);
    }
}
