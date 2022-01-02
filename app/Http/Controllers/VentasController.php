<?php

namespace App\Http\Controllers;

use App\Models\Ventas;
use Illuminate\Http\Request;

class VentasController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $ventas = Ventas::all();
        return response()->json(['status' => 200, 'data' => $ventas]);
    }

    public function nuevaVenta(Request $request) {

        $req = $request->all();

        $venta = new Ventas();
        $venta->cliente_id = $req['cliente'];
        $venta->producto_id = $req['producto'];
        $venta->cantidad = $req['cantidad'];
        $venta->precio_unidad = $req['precioUnitario'];
        $venta->precio_total = $req['precioTotal'];
        $venta->vendedor_id = $req['vendedor'];
        $venta->vendedor_comision = $req['vendedorComision'];
        $venta->save();

        return response()->json(['status' => 200]);
    }

}
