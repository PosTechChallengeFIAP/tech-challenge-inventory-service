import { injectable } from "tsyringe";
import { PocEntity } from "../models/poc.entity";
import { typeOrmConnection } from "../typeorm-connection";
import { Repository } from "typeorm";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { IPoc } from "@application/DTOs/poc";

@injectable()
export class PocEntityRepository implements IPocRepository {
  private repository: Repository<PocEntity>;

  constructor() {
    this.repository = typeOrmConnection.getRepository(PocEntity);
  }

  async getAll(): Promise<IPoc[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<IPoc | null> {
    return this.repository.findOne({ where: { id } });
  }

  save(poc: IPoc): Promise<IPoc> {
    return this.repository.save(poc);
  }
}