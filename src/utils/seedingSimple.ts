import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { ConsoleLogger } from '@nestjs/common';
import {
    SeedMessages,
    SeedMessagesDefault,
    SeedSettings,
    SeedSettingsDefault
} from './type'


export type SeedFn<T extends ObjectLiteral = ObjectLiteral> = (
    repository: Repository<T>, 
    entityManager?: EntityManager,
) => Promise<void>;

export class SeedSimple <TRepository extends ObjectLiteral = ObjectLiteral> {

    private messages: SeedMessages
    private reposetory: EntityTarget<TRepository>
    private settings: SeedSettings
    private loger
    private dataSource: DataSource

    constructor(
        reposetory: EntityTarget<TRepository>,
        messages: SeedMessages,
        settings: Partial<SeedSettings> = {}
    ){
        this.loger = new ConsoleLogger(SeedSimple.name)
        this.reposetory = reposetory
        this.messages = {
            ...SeedMessagesDefault,
            ...messages
        }
        this.settings = {
            ...SeedSettingsDefault,
            ...settings,
        }

        this.dataSource = this.settings.dataSource

    }

    private async seeding(fn: SeedFn<TRepository>) {
        let erorr = null

        this.dataSource = await this.dataSource.initialize();
        const repository = this.dataSource.getRepository(this.reposetory);

        if(this.settings.clearBefore){
            await repository.clear()
            this.loger.warn(`Data in ${repository.metadata.name} is cleared`)
        }else{
            const count = await repository.count();
            if (count !== 0) {
                await this.dataSource.destroy();
                this.loger.warn(`Data exist in ${repository.metadata.name}`)
                return;
            }
        }

        try{
            await this.dataSource.transaction( async (entityManager)=>{
                await fn(repository, entityManager)
            })
            this.loger.log(this.messages.success);
        }catch (e){
            erorr = e
        }finally{
            await this.dataSource.destroy();
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