import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../app/user/entity/user';

class UserSeeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');

    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        email: 'voodoomodoo@gmail.com',
        password: '12345678',
        name: 'Suko Widodo',
      },
    ]);
  }
}
