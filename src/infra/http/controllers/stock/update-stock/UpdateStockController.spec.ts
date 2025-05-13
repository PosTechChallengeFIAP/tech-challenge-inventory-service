import { UpdateStockController } from "./UpdateStockController";
import { IUpdateStockUseCase } from "@application/usecases/stock/update-stock/IUpdateStockUseCase";
import { HttpRequest } from "@infra/http/protocols/http";

describe("UpdateStockController", () => {
  let updateStockUseCase: jest.Mocked<IUpdateStockUseCase>;
  let controller: UpdateStockController;

  beforeEach(() => {
    updateStockUseCase = {
      execute: jest.fn(),
    };
    controller = new UpdateStockController(updateStockUseCase);
  });

  it("when valid stockId, quantity and unitPrice are provided should update stock and return success response", async () => {
    const request: HttpRequest = {
      params: { stockId: 1 },
      body: { quantity: 20, unitPrice: 15.5 },
    };

    const updatedStock = {
      id: 1,
      quantity: 20,
      unitPrice: 15.5,
    } as any;

    updateStockUseCase.execute.mockResolvedValue(updatedStock);

    const response = await controller.handle(request);

    expect(updateStockUseCase.execute).toHaveBeenCalledWith({
      stockId: 1,
      quantity: 20,
      unitPrice: 15.5,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedStock);
  });
});
