<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param string Role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {


        if (!Auth::check()) {
            if ($request->ajax()) {
                return response('Unauthorized.', 401);
            } else {
                // Set intended page
                session()->put('intended_url',$request->url());
                return redirect()->route('admin.signin');
            }
        }
        if (Auth::user()->role_id > $role) {
            return redirect()->back();
        }
        return $next($request);
    }
}
