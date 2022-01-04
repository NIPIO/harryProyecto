<?php

namespace App\Http\Controllers;

use App\Models\Productos;
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

        return response()->json(['status' => 200, 'data' => $ventas]);
    }

    public function nuevaVenta(Request $request) {
        $req = $request->all();
        $cliente = $req['cliente'];
        $vendedor = $req['vendedor'];
        DB::beginTransaction();
        try {
            foreach ($req['rowsProductos'] as $productoVenta) {
                $venta = Ventas::create([
                'cliente_id' => $cliente,
                'vendedor_id' => $vendedor,
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


        } catch (\Throwable $e) {
            Log::error($e->getMessage() . $e->getTraceAsString());
            DB::rollBack();
            return response()->json(['status' => 500]);
        }

        return response()->json(['status' => 200]);
    }

}
