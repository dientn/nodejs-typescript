class Environment {
    get(key: string, defaultValue: any = ''){
        return process.env[key] || defaultValue || '';
    }

    getAsString(key: string, defaultValue: any = ''): string{
        return this.get(key, defaultValue) as string;
    }

    getAsNumber(key: string, defaultValue: any = ''): number{
        return this.get(key, defaultValue) as number;
    }

}

export default new Environment()