import { NestFactory } from '@nestjs/core';
import { AuthService } from '../auth/auth.service';
import { Gender } from '../users/enums';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { StandaloneDatabaseModule } from '../utils/standalone.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// const usersSeed = new Seed(
//     User,
//     { success: 'Данные о пользователях загружены' },
//     { clearBefore: false },
// )

// usersSeed.run(async (repository) => {
//     for (const user of users) {
//         await repository.save(repository.create(user))
//     }

//     console.log(await repository.find({}))
// })


@Module({
  imports: [UsersModule, StandaloneDatabaseModule, AuthModule],
})
export class StandaloneAppModule {}


async function run(){
    const app = await NestFactory.createApplicationContext(StandaloneAppModule);
    const db = app.get(TypeOrmModule)
    const dataSource = app.get(DataSource);

    // Теперь можно использовать dataSource напрямую
    console.log('DataSource initialized:', dataSource.isInitialized);

    const authService = app.get(AuthService);
    await authService.register({
        password: 'admin',
        name: 'admin',
        email: 'admin@mail.com',
        age: 100,
        city: 'null',
        aboutMe: 'null',
        gender: Gender.MALE
    });
    await app.close();
}

run().catch((e)=>{
    console.log(e)
})