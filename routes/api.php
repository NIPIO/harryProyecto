<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\ComprasController;
use App\Http\Controllers\CtaCteController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\VendedoresController;
use App\Http\Controllers\MarcasController;
use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\VentasController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/', function () {
    return view('welcome');
});

Route::prefix('')->group(function () {
    Route::get('productos', [ProductosController::class, 'index']);
    Route::post('producto', [ProductosController::class, 'nuevoProducto']);
    Route::put('producto/{id}', [ProductosController::class, 'editarProducto']);
    Route::delete('producto/{id}', [ProductosController::class, 'borrarProducto']);

    Route::get('ventas', [VentasController::class, 'index']);
    Route::get('ventasByFilter', [VentasController::class, 'ventasByFilter']);
    Route::get('venta/{id}', [VentasController::class, 'getVenta']);
    Route::post('venta', [VentasController::class, 'nuevaVenta']);
    Route::put('venta/{id}', [VentasController::class, 'editarVenta']);

    Route::get('compras', [ComprasController::class, 'index']);
    Route::post('compra', [ComprasController::class, 'nuevaCompra']);
    
    Route::get('marcas', [MarcasController::class, 'index']);
    Route::post('marca', [MarcasController::class, 'nuevaMarca']);
    Route::put('marca/{id}', [MarcasController::class, 'editarMarca']);
    Route::delete('marca/{id}', [MarcasController::class, 'borrarMarca']);
    
    Route::get('proveedores', [ProveedoresController::class, 'index']);
    Route::post('proveedor', [ProveedoresController::class, 'nuevoProveedor']);
    Route::put('proveedor/{id}', [ProveedoresController::class, 'editarProveedor']);

    
    Route::get('vendedores', [VendedoresController::class, 'index']);
    // Route::post('vendedor', [VendedoresController::class, 'nuevoVendedor']);
    Route::delete('vendedor/{id}', [VendedoresController::class, 'borrarVendedor']);
    
    Route::get('clientes', [ClientesController::class, 'index']);
    Route::post('cliente', [ClientesController::class, 'nuevoCliente']);
    Route::put('cliente/{id}', [ClientesController::class, 'editarCliente']);
    
    Route::get('cuentas-corrientes', [CtaCteController::class, 'index']);
    Route::post('cuentas-corrientes', [CtaCteController::class, 'nuevaCtaCte']);
    Route::put('cuentas-corrientes/{id}', [CtaCteController::class, 'editarCuenta']);

    Route::post('login', [LoginController::class, 'login']);
    Route::post('registro', [LoginController::class, 'registro']);

    




});