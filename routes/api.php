<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientesController;
use App\Http\Controllers\CtaCteController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\VendedoresController;
use App\Http\Controllers\MarcasController;
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
    Route::get('ventas', [VentasController::class, 'index']);
    Route::get('marcas', [MarcasController::class, 'index']);
    Route::get('vendedores', [VendedoresController::class, 'index']);
    Route::get('clientes', [ClientesController::class, 'index']);
    Route::get('cuentas-corrientes', [CtaCteController::class, 'index']);

    
    // Route::get('usuarios', [AdminController::class, 'index_usuarios'])->middleware(['permiso:Ver usuarios']);
    // Route::get('usuarios/lista', [AdminController::class, 'getAll']);
    // Route::get('usuario/{users_with_trashed}', [AdminController::class, 'show_user'])->middleware(['permiso:Ver info de usuario']);
    // Route::get('rol/{rolID}', [AdminController::class, 'show_rol'])->where('rolID', "\d+")->middleware(['permiso:Ver rol']);




    Route::post('producto', [ProductosController::class, 'nuevoProducto']);

});