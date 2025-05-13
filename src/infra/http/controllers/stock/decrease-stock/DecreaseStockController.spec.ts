import { DecreaseStockController } from "./DecreaseStockController";
import { IDecreaseStockUseCase } from "@application/usecases/stock/decrease-stock/IDecreaseStockUseCase";
import { HttpRequest } from "@infra/http/protocols/http";

describe("DecreaseStockController", () => {
  let decreaseStockUseCase: jest.Mocked<IDecreaseStockUseCase>;
  let controller: DecreaseStockController;

  beforeEach(() => {
    decreaseStockUseCase = {
      execute: jest.fn(),
    };
    controller = new DecreaseStockController(decreaseStockUseCase);
  });

  it("when valid stockId and quantity are provided should decrease stock and return success response", async () => {
    const request: HttpRequest = {
      params: { stockId: 1 },
      body: { quantity: 5 },
    };

    const result = {
      success: true,
      message: "Stock quantity decreased successfully",
    };

    decreaseStockUseCase.execute.mockResolvedValue(result);

    const response = await controller.handle(request);

    expect(decreaseStockUseCase.execute).toHaveBeenCalledWith({
      stockId: 1,
      quantity: 5,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(result);
  });
});
