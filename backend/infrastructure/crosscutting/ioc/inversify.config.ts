import { Container } from 'inversify';

// Types
import { TYPES } from './types';

// Repositories
import { ProductRepository } from '../../data/repositories/product.repository';
import { CategoryRepository } from '../../data/repositories/category.repository';
import { UserRepository } from '../../data/repositories/user.repository';
import { LogRepository } from '../../data/repositories/log.repository';
import { DonationRepository } from '../../data/repositories/donation.repository';
import { PointRepository } from '../../data/repositories/point.repository';
import { RankRepository } from '../../data/repositories/rank.repository';
import { AddressRepository } from '../../data/repositories/address.repository';

// Repositories interfaces
import { IProductRepository } from '../../../domain/interfaces/product-repository.interface';
import { ICategoryRepository } from '../../../domain/interfaces/category-repository.interface';
import { IDonationRepository } from '../../../domain/interfaces/donation-repository.interface';
import { ILogRepository } from '../../../domain/interfaces/log-repository.interface';
import { IPointRepository } from '../../../domain/interfaces/point-repository.interface';
import { IAddressRepository } from '../../../domain/interfaces/address-repository.interface';
import { IRankRepository } from '../../../domain/interfaces/rank-repository.interface';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';

// Services
import { ProductService } from '../../../application/services/product.service';
import { CategoryService } from '../../../application/services/category.service';
import { UserService } from '../../../application/services/user.service';
import { LogService } from '../../../application/services/LOG.service';
import { DonationService } from '../../../application/services/donation.service';
import { PointService } from '../../../application/services/point.service';
import { RankService } from '../../../application/services/rank.service';
import { AddressService } from '../../../application/services/address.service';

// Services interfaces
import { IProductService } from '../../../application/interfaces/product-service.interface';
import { ICategoryService } from '../../../application/interfaces/category-service.interface';
import { IDonationService } from '../../../application/interfaces/donation-service.interface';
import { IPointService } from '../../../application/interfaces/point-service.interface';
import { IAddressService } from '../../../application/interfaces/address-service.interface';
import { IRankService } from '../../../application/interfaces/rank-service.interface';
import { ILogService } from '../../../application/interfaces/log-service.interface';
import { IUserService } from '../../../application/interfaces/user-service.interface';

// Constants
import { Mapper } from "@nartc/automapper";

// Constants interfaces
import { IMapper } from '../../../application/interfaces/mapper.interface';

// Binds
const container = new Container();

// Services Binds
container.bind<IProductService>(TYPES.IProductService).to(ProductService);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<ILogService>(TYPES.ILogService).to(LogService);
container.bind<IDonationService>(TYPES.IDonationService).to(DonationService);
container.bind<IPointService>(TYPES.IPointService).to(PointService);
container.bind<IRankService>(TYPES.IRankService).to(RankService);
container.bind<IAddressService>(TYPES.IAddressService).to(AddressService);

// Repositories Binds
container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository);
container.bind<ICategoryRepository>(TYPES.ICategoryRepository).to(CategoryRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<ILogRepository>(TYPES.ILogRepository).to(LogRepository);
container.bind<IDonationRepository>(TYPES.IDonationRepository).to(DonationRepository);
container.bind<IPointRepository>(TYPES.IPointRepository).to(PointRepository);
container.bind<IRankRepository>(TYPES.IRankRepository).to(RankRepository);
container.bind<IAddressRepository>(TYPES.IAddressRepository).to(AddressRepository);

// Constants
container.bind<IMapper>(TYPES.IMapper).toConstantValue(Mapper);

export { container };