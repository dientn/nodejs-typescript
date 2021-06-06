class Config {
    get(key: string, defaultValue: any = ''){
        return process.env[key] || defaultValue || '';
    }

    getAsString(key: string, defaultValue: any = ''): string{
        return (process.env[key] || defaultValue || '') as string;
    }

    getAsNumber(key: string, defaultValue: any = ''): Number{
        return (process.env[key] || defaultValue || '') as Number;
    }

}

export default new Config()