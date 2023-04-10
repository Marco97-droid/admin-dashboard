<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function rules_update($id) {
        return [
            "partita_iva" => 'required|min:3|unique:customers,partita_iva,'.$id.',id',
            "logo" => 'nullable|mimes:jpeg,png,jpg,gif|max:512',
            "ragione_sociale" => 'required|min:3',
            "indirizzo" => 'nullable|min:3',
            "citta" => 'nullable|min:3',
            "provincia" => 'nullable|min:2|max:3',
            "cap" => 'nullable|min:3|max:6',
            "latitudine" => 'nullable|min:3',
            "longitudine" => 'nullable|min:3',

        ];
    }
    
}
