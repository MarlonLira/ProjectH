import { Mapper } from '@nartc/automapper'
import { EntityToModel } from './entity-to-model.mapper';
import { ModelToEntity } from './model-to-entity.mapper';

Mapper.addProfile(EntityToModel);
Mapper.addProfile(ModelToEntity);