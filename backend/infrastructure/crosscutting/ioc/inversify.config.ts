import { Container } from 'inversify';

// Types
import { TYPES } from './types';

// Repositories
import { ProductRepository } from '../../data/repositories/product.repository';
import { CategoryRepository } from '../../data/repositories/category.repository';
import { UserRepository } from '../../data/repositories/user.repository';
import { LogRepository } from '../../data/repositories/log.repository';

// Repositories interfaces
import { IProductRepository } from '../../../domain/interfaces/product-repository.interface';
import { ICategoryRepository } from '../../../domain/interfaces/category-repository.interface';

// Services
import { ProductService } from '../../../application/services/product.service';
import { CategoryService } from '../../../application/services/category.service';
import { UserService } from '../../../application/services/user.service';
import { LogService } from '../../../application/services/LOG.service';

// Services interfaces
import { IProductService } from '../../../application/interfaces/product-service.interface';
import { ICategoryService } from '../../../application/interfaces/category-service.interface';

// Constants
import { Mapper } from "@nartc/automapper";

// Constants interfaces
import { IMapper } from '../../../application/interfaces/mapper.interface';
import { IUserService } from '../../../application/interfaces/user-service.interface';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';
import { ILogService } from '../../../application/interfaces/log-service.interface';
import { ILogRepository } from '../../../domain/interfaces/log-repository.interface';

// Binds
const container = new Container();

// Services Binds
container.bind<IProductService>(TYPES.IProductService).to(ProductService);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<ILogService>(TYPES.ILogService).to(LogService);

// Repositories Binds
container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);
container.bind<ICategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<ILogRepository>(TYPES.ILogRepository).to(LogRepository);

// Constants
container.bind<IMapper>(TYPES.IMapper).toConstantValue(Mapper);

export { container };