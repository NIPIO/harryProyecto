<?php

namespace App\Http\Controllers;

use App\Models\Clientes;
use App\Models\Productos;
use App\Models\Vendedores;
use App\Models\Ventas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VentasController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $ventas = Ventas::orderBy('id', 'DESC')->with(['cliente', 'producto', 'vendedor'])->get();

        return response()->json(['error' => false, 'data' => $ventas]);
    }

    public function nuevaVenta(Request $request) {
        $req = $request->all();

        $cliente = Clientes::where('nombre', $req['cliente'])->first();
        $vendedor = Vendedores::where('usuario', $req['vendedor'])->first();

        DB::beginTransaction();
        try {
            foreach ($req['rowsProductos'] as $productoVenta) {
                $venta = Ventas::create([
                    'cliente_id' => $cliente['id'],
                    'vendedor_id' => $vendedor['id'],
                    'producto_id' => $productoVenta['producto'] + 1,
                    'cantidad' => $productoVenta['cantidad'],
                    'precio_unidad' => $productoVenta['precioUnitario'],
                    'precio_total' => $productoVenta['precioUnitario'] * $productoVenta['cantidad'],
                    'vendedor_comision' => null,
                ]);
                
                $venta->save();

                $producto = Productos::find($productoVenta['producto'] + 1);
                $producto->update(['stock' => $producto->stock - $productoVenta['cantidad']]);

                $producto->save();
                DB::commit();

            }

        } catch (\Exception $e) {
            Log::error($e->getMessage() . $e->getTraceAsString());
            DB::rollBack();
            throw new \Exception('Ocurrió un error.');
        }

        return response()->json(['error' => false]);
    }

    public function getVenta(int $id) {

        try {
            $venta = Ventas::whereId($id)->with(['producto'])->first();
    
        } catch (\Exception $th) {
            throw new \Exception('Ocurrió un error.');
        }
        return response()->json(['error' => false, 'data' => $venta]);

    }

    public function editarVenta(Request $request) {
        dd($request);
    }
}
