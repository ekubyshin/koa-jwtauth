import jwt from 'jsonwebtoken'

function resolveAuthorizationHeader(header) {
    if (!header || !header.authorization) {
        return;
    }

    const parts = header.authorization.split(' ');

    if (parts.length === 2) {
        const [scheme, credentials] = parts;

        if (/^Bearer$/i.test(scheme)) {
            return credentials;
        }
    } else {
        return false;
    }
}

export default (securityToken, throw403 = false) => {
    if (!securityToken || typeof securityToken !== 'string') {
        throw new Error('Provide security token');
    }
    return async (ctx, next) => {
        ctx.state = ctx.state || {};
        const token = resolveAuthorizationHeader(ctx.headers);
        if (!token) {
            if (throw403)
                ctx.throw(403)
            else
                await next();
        } else {
            const userData = (() => {
                try {
                    return jwt.verify(token, securityToken);
                } catch (e) {
                    return null;
                }
            })();

            if (userData) {
                ctx.state = ctx.state || {};
                ctx.state.user = userData;
                await next();
            } else if (throw403) {
                ctx.throw(403);
            } else {
                await next();
            }
        }
    };
}