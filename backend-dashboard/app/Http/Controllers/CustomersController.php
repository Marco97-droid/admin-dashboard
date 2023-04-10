<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Illuminate\Support\Facades\File;
use Exception;
use Illuminate\Support\Facades\Validator;


class CustomersController extends Controller
{
    

    public function getCustomers() {

        return response()->json(Customer::all());
    }


    public function editCustomer(Request $request) {

        $cliente = Customer::find($request->id);
        $base_path = env("BASE_PATH");

        if($cliente) {

            $url_old_foto = public_path(substr($cliente->logo, strpos($cliente->logo, $base_path) + strlen($base_path))); // /img/clienti/xxxxxxxxx.jpp


            //$validator = Validator::make($request->all() , Customer::rules_update($request->id));
            $validator = $this->validate($request , Customer::rules_update($request->id));
            
            return response()->json([$validator]);

            if(request()->hasFile('logo')) {
                try {
                    $file = $request->file('logo');
                    $fileName = $request->file('logo')->hashName();
                    $file->move(public_path('/img/clienti'), $fileName);
                    $cliente->logo = $base_path . '/img/clienti/' . $fileName;

                    if(File::exists($url_old_foto)){
                        File::delete($url_old_foto);
                    }

                } catch (Exception $e) {
                    return response()->json($e);
                }
            }

            if($validator) {
                $cliente->update();
            }

        }

        return response()->json($cliente);
    }
}
