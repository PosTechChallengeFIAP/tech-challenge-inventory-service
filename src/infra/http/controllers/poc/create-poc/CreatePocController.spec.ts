import { CreatePocController } from "./CreatePocController";
import { ICreatePocUseCase } from "@application/usecases/poc/create-poc/ICreatePocUseCase";
import { HttpRequest } from "@infra/http/protocols/http";

describe("CreatePocController", () => {
  let createPocUseCase: jest.Mocked<ICreatePocUseCase>;
  let controller: CreatePocController;

  beforeEach(() => {
    createPocUseCase = {
      execute: jest.fn(),
    };
    controller = new CreatePocController(createPocUseCase);
  });

  it("when valid request is received should return 200 with created POC", async () => {
    const request: HttpRequest = {
      body: {
        name: "Poc 1",
        description: "Desc 1",
        category: "OTHER",
      },
    };

    const createdPoc = {
      id: 1,
      name: "Poc 1",
      description: "Desc 1",
      category: "OTHER",
    } as any;

    createPocUseCase.execute.mockResolvedValue(createdPoc);

    const response = await controller.handle(request);

    expect(createPocUseCase.execute).toHaveBeenCalledWith({
      name: "Poc 1",
      description: "Desc 1",
      category: "OTHER",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(createdPoc);
  });
});
