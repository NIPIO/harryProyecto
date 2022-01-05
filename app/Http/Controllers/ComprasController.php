<?php

namespace App\Http\Controllers;

use App\Models\Compras;
use App\Models\Productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ComprasController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $compras = Compras::orderBy('id', 'DESC')->with(['proveedor', 'producto'])->get();

        return response()->json(['status' => 200, 'data' => $compras]);
    }

    
    public function nuevaCompra(Request $request) {
        $req = $request->all();
        $proveedor = $req['proveedor'];
        DB::beginTransaction();
        try {
            foreach ($req['rowsProductos'] as $productoCompra) {
                $venta = Compras::create([
                'proveedor_id' => $proveedor,
                'producto_id' => $productoCompra['producto'] + 1,
                'cantidad' => $productoCompra['cantidad'],
                'precio_unidad' => $productoCompra['precioUnitario'],
                'precio_total' => $productoCompra['precioUnitario'] * $productoCompra['cantidad'],
                ]);
                
                $venta->save();

                $producto = Productos::find($productoCompra['producto'] + 1);
                $producto->update(['stock' => $producto->stock - $productoCompra['cantidad']]);

                $producto->save();
                DB::commit();

            }


        } catch (\Throwable $e) {
            Log::error($e->getMessage() . $e->getTraceAsString());
            DB::rollBack();
            return response()->json(['error' => true, 'data' => $e->getMessage()]);
        }

        return response()->json(['status' => 200]);
    }
}
