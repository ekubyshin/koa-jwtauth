# koa-jwtauth
JSONWebtoken middleware for koa@2

This middleware watch for authorization header and set user data from jwt token to ctx.state if header is exists.

Middleware can throw an Forbidden error and prevent next middleware execution or silently call next middleware.

#Usage:

    import jwtmiddleware from 'koa-jwtauth'
    import {createHash} from 'crypto'

    const securityToken = createHash('md5').update('Some salt').digest('hext');
    
    //silent
    app.use(jwtmiddleware(securityToken));
    //throw 403 error
    app.use(jwtmiddleware(securityToken, true));
      
