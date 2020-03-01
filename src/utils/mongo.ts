export const MongoUtil = {
    toConnectionString: (credentials): string => {
        const preFormat = `${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database}`
        return `mongodb://${preFormat}?authSource=admin`
    }
}