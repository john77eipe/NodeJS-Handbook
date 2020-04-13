var config = {
    development: {
        //mongodb connection settings
        database: {
            host:   '127.0.0.1',
            port:   '27017',
            db:     'blogdb'
        },
    },
    production: {
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:   'blogdb'
        },
    }
};
export default config;