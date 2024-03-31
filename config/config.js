const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 8081,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://isaacebiniyi123:incident@cluster0.fwkrkkd.mongodb.net/incident_Management?retryWrites=true&w=majority"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
   