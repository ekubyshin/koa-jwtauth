# koa-jwtauth
JSONWebtoken middleware for koa@2

This middleware watches for the authorization header and sets user data from jwttoken to ctx.state if the header exists.

Middleware can throws the Forbidden error and prevents next middleware execution or silently calls next middleware.

#Usage:

    import jwtmiddleware from 'koa-jwtauth'
    import {createHash} from 'crypto'

    const securityToken = createHash('md5').update('Some salt').digest('hext');
    
    //silent
    app.use(jwtmiddleware(securityToken));
    //throw 403 error
    app.use(jwtmiddleware(securityToken, true));
      
