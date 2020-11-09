import { Container } from 'inversify';

// Types
import { TYPES } from './types';

// Repositories
import { ProductRepository } from '../../data/repositories/product.repository';
import { CategoryRepository } from '../../data/repositories/category.repository';

// Repositories interfaces
import { IProductRepository } from '../../../domain/interfaces/product-repository.interface';
import { ICategoryRepository } from '../../../domain/interfaces/category-repository.interface';

// Services
import { ProductService } from '../../../application/services/product.service';
import { CategoryService } from '../../../application/services/category.service';

// Services interfaces
import { IProductService } from '../../../application/interfaces/product-service.interface';
import { ICategoryService } from '../../../application/interfaces/category-service.interface';

// Constants
import { Mapper } from "@nartc/automapper";

// Constants interfaces
import { IMapper } from '../../../application/interfaces/mapper.interface';

// Binds
const container = new Container();

// Services Binds
container.bind<IProductService>(TYPES.IProductService).to(ProductService);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);

// Repositories Binds
container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);
container.bind<ICategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);

// Constants
container.bind<IMapper>(TYPES.IMapper).toConstantValue(Mapper);

export { container };