<?php

namespace App\Http\Controllers;

use App\Models\Marcas;
use App\Models\Productos;
use Illuminate\Http\Request;

class MarcasController extends Controller
{

    public $marcas;

    public function __construct()
    {
    }

    public function index() {
        $this->marcas = Marcas::orderBy('id', 'ASC')->get();

        $this->getStockTotal();
        $this->getStockEnTransito();
        return response()->json(['status' => 200, 'data' => $this->marcas]);
    }


    public function nuevaMarca(Request $request) {

        $req = $request->all();

        $marca = new Marcas();
        $marca->nombre = $req['nombre'];
        $marca->save();

        return response()->json(['status' => 200]);
    }

    public function getStockTotal() {
        foreach ($this->marcas as $marca) {
            $productosDeEsaMarca = Productos::where('marca', '=', $marca->id)->get();

            $cantidad = 0;
            foreach ($productosDeEsaMarca as $producto) {
               $cantidad += $producto->stock;
            }

            $this->marcas[$marca->id - 1]->cantidadTotal = $cantidad;
        }

    }

    
    public function getStockEnTransito() {
        foreach ($this->marcas as $marca) {
            $productosDeEsaMarca = Productos::where('marca', '=', $marca->id)->get();

            $cantidad = 0;
            foreach ($productosDeEsaMarca as $producto) {
               $cantidad += $producto->en_transito;
            }

            $this->marcas[$marca->id - 1]->enTransito = $cantidad;
        }

        return $this->marcas;

    }
}
