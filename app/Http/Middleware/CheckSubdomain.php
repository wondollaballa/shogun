<?php

namespace App\Http\Middleware;

use Closure;

class CheckSubdomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
    
        // Extract the subdomain from URL.
        list($subdomain) = explode('.', $request->getHost(), 2);
        if ($subdomain == 'admin') {
            return $next($request);    
        } else {
            return abort(404);
        }
        
    }
}
