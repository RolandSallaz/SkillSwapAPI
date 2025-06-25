import { User } from '../users/entities/users.entity';
import { Seed } from '../utils/seeding';
import { users } from './users.data';

const usersSeed = new Seed(
    User,
    {
        success: 'null-users',
        error: 'error',
    },
    {
        clearBefore: false
    }
)

usersSeed.run(async (repository) => {
    for (const user of users) {
        await repository.save(repository.create(user))
    }

    console.log(await repository.find({}))
})