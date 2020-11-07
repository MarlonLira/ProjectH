import { Constructible, Dict, MapOptions } from "@nartc/automapper";

export interface IMapper {
  map<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceObj: TSource, destination: Constructible<TDestination>, source?: Constructible<TSource>, options?: MapOptions<TSource, TDestination>): TDestination;
  /**
   * Map a sourceObj to the Destination with an optional Options provided.
   *
   * @param {object} sourceObj
   * @param {Constructible} destination
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  map<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceObj: TSource, destination: Constructible<TDestination>, options?: MapOptions<TSource, TDestination>): TDestination;
  /**
   * Async version of map()
   */
  mapAsync<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceObj: TSource, destination: Constructible<TDestination>, source?: Constructible<TSource>, options?: MapOptions<TSource, TDestination>): Promise<TDestination>;
  /**
   * Async version of map()
   */
  mapAsync<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceObj: TSource, destination: Constructible<TDestination>, options?: MapOptions<TSource, TDestination>): Promise<TDestination>;
  /**
   * Map a sourceArr to an array of Destination with Source model provided.
   * Usually used to map plain array of Source instead of an instance of Source.
   *
   * @example
   * ```typescript
   * const user = this.db.findOne(...).toJSON();
   * Mapper.map(user, UserVm, User);
   * ```
   *
   * @param {Array} sourceArr
   * @param {Constructible} destination
   * @param {Constructible} source
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  mapArray<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceArr: TSource[], destination: Constructible<TDestination>, source?: Constructible<TSource>, options?: MapOptions<TSource[], TDestination[]>): TDestination[];
  /**
   * Map a sourceArr to an Array of Destination with an optional Options provided.
   *
   * @param {Array} sourceArr
   * @param {Constructible} destination
   * @param {MapOptions} options - Provide callbacks for this map operation
   */
  mapArray<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceArr: TSource[], destination: Constructible<TDestination>, options?: MapOptions<TSource[], TDestination[]>): TDestination[];
  /**
   * Async version of mapArray()
   */
  mapArrayAsync<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceArr: TSource[], destination: Constructible<TDestination>, source?: Constructible<TSource>, options?: MapOptions<TSource[], TDestination[]>): Promise<TDestination[]>;
  /**
   * Async version of mapArray()
   */
  mapArrayAsync<TSource extends Dict<TSource> = any, TDestination extends Dict<TDestination> = any>(sourceArr: TSource[], destination: Constructible<TDestination>, options?: MapOptions<TSource[], TDestination[]>): Promise<TDestination[]>;
}