require("dotenv").config();
const config = {
  app: {
    name: process.env.APP_NAME || "Nodex Headless Framework",
    author: "Istiaq Hasan <istiaq.me@gmail.com>",
    version: process.env.APP_VERSION || "1.0.0",
    env: process.env.APP_ENV || "development", // development, production, staging
    debug: process.env.APP_DEBUG || true,
    webRoute: process.env.APP_WEB_ROUTE || "/",
    apiRoute: process.env.APP_API_ROUTE || "/api",
    socketIO: process.env.APP_SOCKET_IO || true,
    corsOptions: {
      origin: "*",
      optionsSuccessStatus: 200,
      credentials: true,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
    },
    nonAuthRoutes: {
      beforeBind: ["/auth/bind/device", "/permission/list"],
      afterBind: [
        "/auth/login/regular",
        "/auth/register/regular",
        "/auth/social-login",
        "/auth/verify/email",
        "/auth/social-login",
      ],
    },
    bindedApps: [
      "com.infoniam.lulu.user.android",
      "com.infoniam.lulu.user.ios",
      "localhost", // for local development
      "com.istiaq.live",
    ],
    bindedDomains: [
      "localhost",
      "api.lulu.com",
      "admin.lulu.com",
      "live.lulu.com",
      "agent.lulu.com",
      "lulu.com",
    ],
    allowedEmailDomainTLDs: ["com"],
  },
  server: {
    port: process.env.PORT || 8002,
  },
  maintenance: {
    ongoing: process.env.MAINTENANCE_ONGOING || false,
    deadline: process.env.MAINTENANCE_DEADLINE || "2023-12-22T09:12:52.092Z", // ISO Date format e.g. "2023-02-22T09:12:52.092Z"
    note: process.env.MAINTENANCE_NOTE || "Regular Maintenance.", // A string if you have any note
  },
  database: {
    mongodb: {
      use: process.env.MONGODB_USE || true,
      host: process.env.MONGODB_HOST || "127.0.0.1",
      port: process.env.MONGODB_PORT || 27017,
      database: process.env.MONGODB_DATABASE || "pptrk_trx_server",
      username: process.env.MONGODB_USERNAME || null, // e.g. 'root', default is NULL
      password: process.env.MONGODB_PASSWORD || null, // e.g. 'password12345', default is NULL
      url: process.env.MONGODB_URL || null, // e.g. 'mongodb://localhost:27017/nodex_by_istiaq_hasan', default is NULL
      modelsDir: process.env.MONGODB_MODELS_DIR || "models/mongodb",
      seederDir: process.env.MONGODB_SEEDER_DATASETS_DIR || "seeders",
      seederDatasetsDir: process.env.MONGODB_SEEDER_DATASETS_DIR || "datasets",
    },
    mysql: {
      use: process.env.MYSQL_USE || false,
      host: process.env.MYSQL_HOST || "localhost",
      port: process.env.MYSQL_PORT || 3306,
      database: process.env.MYSQL_DATABASE || "pptrk_wh",
      username: process.env.MYSQL_USERNAME || "root",
      password: process.env.MYSQL_PASSWORD || "",
    },
  },
  namespaces: {
    app: "app",
    controllers: "app/controllers",
    models: "app/models",
    middlewares: "app/middlewares",
    responses: "app/responses",
    errors: "app/errors",
    helpers: "app/helpers",
    services: "app/services",
    databases: "app/databases",
    routes: "routes",
    mongoose: "app/databases/mongodb",
  },
  supreme: {
    certPath: "app/certs/supreme",
    appKey: "B3F0F1F2F3F4F5F6F7F8F9FAFBFCFDFE",
    hashKey:
      "66D7FC53A561966AE4BAC3C71DBAABDF57CA6A70688860C45A8AD5A1042A578FDA5E622ACFE2E05FA046DE6944D52F9E3EDE5ADAECE7B50B6E2233782AC3E603",
    pairKey: "B3F0F1F2F3F4F5F6F7F8F9FAFBFCFDFE",
    hintKey: "Lal Meri Pat Rakhiyo - Lata Mangeshkar",
  },
};

module.exports = config;
