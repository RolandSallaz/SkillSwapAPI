import { DataSource, EntityManager, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from '../config/ormconfig-migration';


type SeedFn<T extends ObjectLiteral = ObjectLiteral> = (repository: Repository<T>, entityManager?: EntityManager) => Promise<void>;

type SeedMessages = {
    success: string,
    error: string,
};

type SeedSettings = {
    dataSource: DataSource,
    clearBefore: boolean,
}

const SeedSettingsDefault: SeedSettings = {
    dataSource: AppDataSource,
    clearBefore: false,
}

export class Seed <TRepository extends ObjectLiteral = ObjectLiteral> {

    private reposetory: EntityTarget<TRepository>
    private messages: SeedMessages
    private fn: SeedFn<TRepository>
    private settings: SeedSettings

    private dataSource: DataSource

    constructor(
        reposetory: EntityTarget<TRepository>,
        messages: SeedMessages,
        settings: Partial<SeedSettings> = {}
    ){
        this.reposetory = reposetory
        this.messages = messages

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
        }else{

            const count = await repository.count();
            if (count !== 0) {
                await this.dataSource.destroy();
                return;
            }
        }

        try{
            
            await this.dataSource.transaction( async (entityManager)=>{
                await fn(repository, entityManager)
            })

            console.log(this.messages.success);
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
            console.error(this.messages.error, e);
            process.exit(1);
        })
    }
};