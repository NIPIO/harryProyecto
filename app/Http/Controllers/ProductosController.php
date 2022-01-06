<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Responses\Json;
use App\Models\Marcas;
use App\Models\Productos;

class ProductosController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $productos = Productos::with('marcas')->get();
        $productos = Productos::orderBy('id', 'ASC')->with(['marcas'])->get();

        return response()->json(['status' => 200, 'data' => $productos]);
    }


    public function nuevoProducto(Request $request) {

        $req = $request->all();
        $producto = Productos::where('nombre', $req['nombre'])->get()->toArray();

        if (count($producto)) {
            return response()->json(['error' => true, 'data' => 'Existe un producto con ese nombre']);
        }
 
        $marca = Marcas::where('nombre', $req['marca'])->first()->toArray();

        $producto = new Productos();
        $producto->nombre = $req['nombre'];
        $producto->marca = $marca['id'];
        $producto->precio = $req['precio'];
        $producto->stock= $req['stock'];
        $producto->save();

        return response()->json(['error' => false]);
    }

    public function editarProducto(Request $request) {
        $req = $request->all();

        $marca = Marcas::where('nombre', $req['marca'])->first()->toArray();
        Productos::whereId($req['id'])->update([
            "nombre" => $req['nombre'],
            "marca" => $marca['id'],
            "stock" => $req['stock'],
            "precio" => $req['precio']
        ]);
        return response()->json(['error' => false]);
    }

    public function borrarProducto(int $id) {
        $producto = Productos::whereId($id)->first();
        $producto->update(['activo' => $producto['activo'] === 0 ? 1 : 0]);
        return response()->json(['error' => false]);
    }

    
}
