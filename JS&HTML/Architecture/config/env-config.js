const envConfig = {
    development: {
        dbConnectionStr: 'mongodb://admin:pesho123:pesho123@ds121295.mlab.com:21295/expressjs-course',
        jwtSecret: 'some-secret',
        port: 3000,
        rootPath: '../',
    },

    production: {
        dbConnectionStr: 'some-prod-string',
        port: process.env.PORT,
        jwtSecret: process.env.SECRET || 'some-secret',
        rootPath: '../',
    }
};

module.exports = envConfig;