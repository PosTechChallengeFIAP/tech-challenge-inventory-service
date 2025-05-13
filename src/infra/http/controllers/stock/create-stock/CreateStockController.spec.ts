import { CreateStockController } from "./CreateStockController";
import { ICreateStockUseCase } from "@application/usecases/stock/create-stock/ICreateStockUseCase";
import { HttpRequest } from "@infra/http/protocols/http";

describe("CreateStockController", () => {
  let createStockUseCase: jest.Mocked<ICreateStockUseCase>;
  let controller: CreateStockController;

  beforeEach(() => {
    createStockUseCase = {
      execute: jest.fn(),
    };
    controller = new CreateStockController(createStockUseCase);
  });

  it("when valid request is provided should create stock and return success response", async () => {
    const request: HttpRequest = {
      body: {
        productId: 1,
        pocId: 2,
        quantity: 100,
        unitPrice: 9.99,
      },
    };

    const createdStock = {
      id: 10,
      productId: 1,
      pocId: 2,
      quantity: 100,
      unitPrice: 9.99,
    } as any;

    createStockUseCase.execute.mockResolvedValue(createdStock);

    const response = await controller.handle(request);

    expect(createStockUseCase.execute).toHaveBeenCalledWith({
      productId: 1,
      pocId: 2,
      quantity: 100,
      unitPrice: 9.99,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(createdStock);
  });
});
