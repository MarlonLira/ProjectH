import { Mapper } from '@nartc/automapper'
import { EntityToModel } from './entity-to-model.Mapper';
import { ModelToEntity } from './model-to-entity.Mapper';

Mapper.addProfile(EntityToModel);
Mapper.addProfile(ModelToEntity);