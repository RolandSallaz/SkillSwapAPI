import { Category } from "../category/entities/category.entity";
import { Seed } from '../utils/seeding';
import { categories } from "./categories.data";

const usersSeed = new Seed(
    Category,
    {
        success: 'null-category',
        error: 'error',
    },
    {
        clearBefore: true
    }
)

usersSeed.run(async (repository) => {

    const parentsMap = new Map();

    for (const category of categories) {

        if (category.parent == null) {
            const entity = await repository.save(repository.create(category));
            parentsMap.set(entity.name, entity);
        } else {
            const payload: Category = {
                ...category,
                parent: parentsMap.get(category.parent?.name),
            }

            const entity = await repository.save(repository.create(payload));
            parentsMap.set(entity.name, entity);
        }
    }
})