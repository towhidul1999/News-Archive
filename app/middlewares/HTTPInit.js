const Handler = lulu.use('app/errors/Handler');
const response = lulu.use('app/responses/Response');
const { v4: uuidv4 } = require('uuid');
module.exports = async function (req, res, next) {
    try {
        req.luluLogger = {
            jobId: uuidv4(),
            reqMS: Date.now(),
            req: {
                headers: req.headers,
                hostname: req.hostname,
                host: req.get('host'),
                ip: req.ip,
                ips: req.ips,
                protocol: req.protocol,
                secure: req.secure,
                subdomains: req.subdomains,
                originalUrl: req.originalUrl,
                baseUrl: req.baseUrl,
                path: req.path,
                method: req.method,
                body: req.body || {},
                files: req.files? true : false,
            }
        };

        res.setHeader('X-Powered-By', 'Java Spring Boot');
        res.setHeader('X-Request-Id', req.luluLogger.jobId);
        res.setHeader('X-Developer-URL', 'infoniam.com');
        res.setHeader('X-Developer-Name', 'Infoniam Technologies');
        res.setHeader('X-Developer-Email', 'istiaq.me@gmail.com');
        res.setHeader('X-Developer-Phone', '+8801711-265415');
        res.setHeader('X-Developer-Address', 'Dhaka, Bangladesh');
        res.setHeader('X-Software-Version', '1.0.0');
        res.setHeader('X-Software-Core', 'Lulu Live API Core Engine');
        req.headers.__device ? res.setHeader('X-Fingerprint', req.headers.__device) : null;


        lulu.context.http.req = req;
        lulu.context.http.res = res;
        lulu.context.http.next = next;
        next();
    }
    catch (error) { 
        return response.error(Handler(error), res);
    }

}