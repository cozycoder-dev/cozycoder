import { DummyDriver, DynamicModule, Kysely, RawBuilder, ReferenceExpression, SelectQueryBuilder, SqliteAdapter, SqliteIntrospector, SqliteQueryCompiler } from 'kysely';
export declare const notSoftDeletedClause: (alias: DbRef) => RawBuilder<unknown>;
export declare const softDeleted: (repoOrRecord: {
    takedownRef: string | null;
}) => boolean;
export declare const countAll: RawBuilder<number>;
export declare const countDistinct: (ref: DbRef) => RawBuilder<number>;
export declare const excluded: <T, S>(db: Kysely<S>, col: any) => RawBuilder<T>;
export declare const valuesList: (vals: unknown[]) => RawBuilder<unknown>;
export declare const dummyDialect: {
    createAdapter(): SqliteAdapter;
    createDriver(): DummyDriver;
    createIntrospector(db: any): SqliteIntrospector;
    createQueryCompiler(): SqliteQueryCompiler;
};
export declare const retrySqlite: <T>(fn: () => Promise<T>) => Promise<T>;
export type Ref = ReferenceExpression<any, any>;
export type DbRef = RawBuilder | ReturnType<DynamicModule['ref']>;
export type AnyQb = SelectQueryBuilder<any, any, any>;
export declare const isErrUniqueViolation: (err: unknown) => boolean;
//# sourceMappingURL=util.d.ts.map