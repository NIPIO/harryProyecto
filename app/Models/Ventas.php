<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ventas extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'ventas';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * @var array
     */
    protected $fillable = ['cliente_id', 'precio_total', 'vendedor_id', 'vendedor_comision', 'fecha_venta', 'cantidad', 'created_at', 'updated_at'];

    protected $casts = [
        'fecha_venta'  => 'datetime:d-m-Y',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function cliente()
    {
        return $this->belongsTo(Clientes::class, 'cliente_id', 'id');
    }

    public function vendedor()
    {
        return $this->belongsTo(Vendedores::class, 'vendedor_id', 'id');
    }

}

