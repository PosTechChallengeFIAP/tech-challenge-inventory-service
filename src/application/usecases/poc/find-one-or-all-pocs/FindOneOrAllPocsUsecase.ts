import { inject, injectable } from "tsyringe";
import { IFindOneOrAllPocsUsecase } from "./IFindOneOrAllPocsUsecase";
import { TFindOneOrAllPocsUsecaseRequest, TFindOneOrAllPocsUsecaseResponse } from "./TFindOneOrAllPocsUsecase";
import { IPocRepository } from "@domain/repositories/IPocRepository";

@injectable()
export class FindOneOrAllPocsUsecase implements IFindOneOrAllPocsUsecase {
    constructor(
        @inject("PocRepository")
        private readonly pocRepository: IPocRepository,
    ) {}

    async execute(input: TFindOneOrAllPocsUsecaseRequest): Promise<TFindOneOrAllPocsUsecaseResponse> {
        const { id } = input;

        if (id) {
            const poc = await this.pocRepository.getById(id);
            return poc;
        }

        const pocs = await this.pocRepository.getAll();
        return pocs;
    }
}