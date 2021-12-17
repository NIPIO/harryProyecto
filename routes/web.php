<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductosController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('admin')->group(function () {
    Route::get('productos', [ProductosController::class, 'indexProductos']);
    // Route::get('usuarios', [AdminController::class, 'index_usuarios'])->middleware(['permiso:Ver usuarios']);
    // Route::get('usuarios/lista', [AdminController::class, 'getAll']);
    // Route::get('usuario/{users_with_trashed}', [AdminController::class, 'show_user'])->middleware(['permiso:Ver info de usuario']);
    // Route::get('rol/{rolID}', [AdminController::class, 'show_rol'])->where('rolID', "\d+")->middleware(['permiso:Ver rol']);
});
