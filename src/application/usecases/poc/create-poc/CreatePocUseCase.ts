import { inject, injectable } from "tsyringe";
import { ICreatePocUseCase } from "./ICreatePocUseCase";
import { TCreatePocUseCaseRequest, TCreatePocUseCaseResponse } from "./TCreatePocUseCase";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { IPocToCreate } from "@application/DTOs/poc-to-create";

@injectable()
export class CreatePocUseCase implements ICreatePocUseCase {
    constructor(
        @inject("PocRepository")
        private readonly pocRepository: IPocRepository,
    ) {}

    async execute(request: TCreatePocUseCaseRequest): Promise<TCreatePocUseCaseResponse> {
        const { name, description, category } = request;

        const newPoc: IPocToCreate = {
            name,
            description,
            category,
        };

        const savedPoc = await this.pocRepository.save(newPoc);

        return savedPoc;
    }
}