declare module "mongodb" {
  interface Db {
    collection(name: string): Collection;
  }

  interface Collection {
    insertOne(data: any): Promise<any>;
  }
}
