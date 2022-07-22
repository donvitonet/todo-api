import { Entity } from '@entities';

export interface IDataMapper {
  insert(e: Entity<unknown>): Promise<Entity<unknown>>;
  findAll(): Promise<Entity<unknown>[]>;
}
