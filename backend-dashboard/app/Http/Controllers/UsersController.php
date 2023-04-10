<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function getLoggedUser()
    {
        return response()->json(Auth::user());
    }

    public function editUser(Request $request)
    {

        $user = User::where('email', $request->originEmail)->first();

        if ($user) {
            
            $base_path = env('BASE_PATH');
            $url_old_foto = public_path(substr($user->foto, strpos($user->foto, $base_path) + strlen($base_path))); // /img/profilo/xxxxxxxxx.jpg

            $user->name = $request->name;
            $user->email = $request->email;

            if ($request->hasFile('foto') && !$request->file('foto')->isValid()) {
                return response()->json('File non valido');
            }
            if($request->hasFile('foto')) {
                try {
                    $file = $request->file('foto');
                    $fileName = $request->file('foto')->hashName();
                    $file->move(public_path('/img/profilo'), $fileName);
                    $user->foto = $base_path . '/img/profilo/' . $fileName;

                    if(File::exists($url_old_foto)){
                        File::delete($url_old_foto);
                    }

                } catch (Exception $e) {
                    return response()->json($e);
                }
            }
            
            if($request->password && $request->conferma_password) {

                request()->validate(User::rules_update_password());
                $user->password = Hash::make(request('password'));
            }

            if($user->update()) {
                return response()->json('Utente modificato con successo');
            }
            
        } 
            
        return response()->json('Errore durante la modifica dei dati');
        
    }
}
