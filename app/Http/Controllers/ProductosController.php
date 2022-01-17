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
        $producto = request()->get('producto');
        $marca = request()->get('marca');
        $productos = Productos::orderBy('id', 'ASC')->with(['marcas']);

        if ($producto) {
            $productos->whereId((int) $producto);
        }
        if ($marca) {
            $productos->whereMarca([(int) $marca]);
        }
        
        return response()->json(['error' => false, 'allProductos' => Productos::all(), 'productosFiltro' => $productos->get()]);
    }


    public function nuevoProducto(Request $request) {
        $req = $request->all();

        try {
            $producto = Productos::where('nombre', $req['nombre'])->get()->toArray();

            if (count($producto)) {
                return response()->json(['error' => true, 'data' => 'Existe un producto con ese nombre']);
            }
     
            $marca = Marcas::where('nombre', $req['marca'])->first()->toArray();

            $producto = new Productos();
            $producto->nombre = $req['nombre'];
            $producto->marca = $marca['id'];
            $producto->precio = $req['precio'];
            $producto->costo = $req['costo'];
            $producto->stock= $req['stock'];
            $producto->stock_reservado = 0;
            $producto->en_transito_reservado = 0;
            $producto->save();
    
        } catch (\Exception $th) {
            throw new \Exception('Ocurrió un error.');
        }
        
        return response()->json(['error' => false]);
    }

    public function editarProducto(Request $request) {
        $req = $request->all();
        try {
            $marca = Marcas::where('nombre', $req['marca'])->first()->toArray();
            Productos::whereId($req['id'])->update([
                "nombre" => $req['nombre'],
                "marca" => $marca['id'],
                "stock" => $req['stock'],
                "precio" => $req['precio'],
                "costo" => $req['costo']
            ]);
        } catch (\Exception $th) {
            throw new \Exception('Ocurrió un error.');
        }
       
        return response()->json(['error' => false]);
    }

    public function borrarProducto(int $id) {

        try {
            $producto = Productos::whereId($id)->first();
            $producto->update(['activo' => $producto['activo'] === 0 ? 1 : 0]);
        } catch (\Exception $th) {
            throw new \Exception('Ocurrió un error.');
        }
       
        return response()->json(['error' => false]);
    }

    
}
