
import { ICreatePocUseCase } from "@application/usecases/poc/create-poc/ICreatePocUseCase";
import { HttpRequest } from "@infra/http/protocols/http";
import { CreatePocController } from "./CreateStockController";

describe("CreatePocController", () => {
  let createPocUseCase: jest.Mocked<ICreatePocUseCase>;
  let controller: CreatePocController;

  beforeEach(() => {
    createPocUseCase = {
      execute: jest.fn(),
    };
    controller = new CreatePocController(createPocUseCase);
  });

  it("when valid input is provided should create and return the new POC", async () => {
    const request: HttpRequest = {
      body: {
        name: "POC Example",
        description: "Test Description",
        category: "FOOD",
      },
    };

    const createdPoc = {
      id: 1,
      name: "POC Example",
      description: "Test Description",
      category: "FOOD",
    } as any;

    createPocUseCase.execute.mockResolvedValue(createdPoc);

    const response = await controller.handle(request);

    expect(createPocUseCase.execute).toHaveBeenCalledWith({
      name: "POC Example",
      description: "Test Description",
      category: "FOOD",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(createdPoc);
  });
});
