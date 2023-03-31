import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { mongoConfig2 } from 'src/config/mongodb-connection';

@Injectable()
export class MongoService {
  private readonly url: string;
  private readonly client: MongoClient;

  constructor() {
    // Initialize the MongoDB URL and client
    this.url = mongoConfig2().MONGO_URI;
    this.client = new MongoClient(this.url);
  }

  async getDbNames(): Promise<string[]> {
    // Connect to MongoDB and get a list of database names
    await this.client.connect();
    const dbNames = await this.client.db().admin().listDatabases();
    await this.client.close();

    // Extract the database names from the list of databases
    return ['janaspandana_database'];
    return dbNames.databases.map((database) => database.name);
  }

  async getDb(dbName: string) {
    // Connect to the specified database
    const connection = await this.client.connect();
    const db = this.client.db(dbName);
    console.log(connection);

    // Return the database connection
    return db;
  }

  async findDocuments(dbName: string, collectionName: string, query: object) {
    // Connect to the specified database and collection, and find documents that match the query
    const db = await this.getDb(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find(query).toArray();
    await collection.insertMany([{ note: 'hello' }, { note: 'chello' }]);

    // Close the database connection and return the documents
    return documents;
  }
}
