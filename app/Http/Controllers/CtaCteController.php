<?php

namespace App\Http\Controllers;

use App\Models\CtaCte;
use App\Models\Productos;
use App\Models\Proveedores;
use Illuminate\Http\Request;

class CtaCteController extends Controller
{
    public function __construct()
    {
    }

    public function index() {
        $cuentas = CtaCte::orderBy('id', 'DESC')->with(['proveedor'])->get();

        return response()->json(['error' => false, 'data' => $cuentas]);
    }

    public function nuevaCtaCte(Request $request) {
        $req = $request->all();
        try {
            $proveedor = Proveedores::where('nombre', $req['proveedor'])->first()->toArray();

                
                if($this->chequearSiExiste($proveedor['id'])){
                        return response()->json(['error' => true, 'data' => 'Ese proveedor ya tiene una cuenta']);
                }

                $venta = new CtaCte();
                $venta->proveedor_id = $proveedor['id'];
                $venta->saldo = $req['saldo'];
                $venta->save();
        } catch (\Exception $th) {
            throw new \Exception('Ocurrió un error.');
        }
        

        return response()->json(['status' => 200]);
    }

    public function editarCuenta(Request $request) {
        $req = $request->all();
        try {
            CtaCte::whereId($req['id'])->update([
                "saldo" => $req['saldo'],
            ]);
        } catch (\Exception $th) {
            throw new \Exception('Ocurrió un error.');
        }
       
        return response()->json(['error' => false]);
    }

    public function chequearSiExiste($proveedorId) {
        return count(CtaCte::where('proveedor_id', $proveedorId)->get()->toArray()) > 0;
    }
}
