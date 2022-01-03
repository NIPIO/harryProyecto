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
        $productos = Productos::with('marcas')->get();

        return response()->json(['status' => 200, 'data' => $productos]);
    }


    public function nuevoProducto(Request $request) {

        $req = $request->all();

        $producto = new Productos();
        $producto->nombre = $req['nombre'];
        $producto->marca = $req['marca'];
        $producto->precio = $req['precio'];
        $producto->stock= $req['stock'];
        $producto->save();

        return response()->json(['status' => 200]);
    }
}
