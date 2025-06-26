import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { ConsoleLogger, INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
    SeedMessages,
    SeedMessagesDefault,
    SeedSettings,
    SeedSettingsDefault
} from './type'


export type SeedFn<T extends ObjectLiteral = ObjectLiteral> = (
    app: INestApplicationContext,
    repository?: Repository<T>,
) => Promise<void>;


export class SeedByApp <TRepository extends ObjectLiteral = ObjectLiteral> {

    private messages: SeedMessages
    private reposetory: EntityTarget<TRepository>
    private settings: SeedSettings
    private loger
    private dataSource: DataSource

    private module

    constructor(
        reposetory: EntityTarget<TRepository>,
        module: any,
        messages: SeedMessages,
        settings: Partial<SeedSettings> = {}
    ){
        this.module = module

        this.loger = new ConsoleLogger(SeedByApp.name)
        this.reposetory = reposetory
        this.messages = {
            ...SeedMessagesDefault,
            ...messages
        }
        this.settings = {
            ...SeedSettingsDefault,
            ...settings,
        }

        
    }

    private async seeding(fn: SeedFn<TRepository>) {
        const app = await NestFactory.createApplicationContext(this.module);
        this.dataSource = app.get(DataSource);
        let erorr = null

        const repository = this.dataSource.getRepository(this.reposetory);

        if(this.settings.clearBefore){
            await repository.clear();
            this.loger.warn(`Data in ${repository.metadata.name} is cleared`)
        }else{
            const count = await repository.count();
            if (count !== 0) {
                await app.close();
                this.loger.warn(`Data exist in ${repository.metadata.name}`)
                return;
            }
        }

        try{
            await fn(app, repository);
            this.loger.log(this.messages.success);
        }catch (e){
            erorr = e
        }finally{
            await app.close();
        }
        
        if(erorr !== null){
            throw erorr
        }
    }

    run(fn: SeedFn<TRepository>){
        this.seeding(fn).catch(e=>{
            this.loger.error(this.messages.error, e);
            process.exit(1);
        })
    }
};