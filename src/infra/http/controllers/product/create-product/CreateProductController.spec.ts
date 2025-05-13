import { CreateProductController } from "./CreateProductController";
import { ICreateProductUseCase } from "@application/usecases/product/create-product/ICreateProductUseCase";
import { HttpRequest } from "@infra/http/protocols/http";

describe("CreateProductController", () => {
  let createProductUseCase: jest.Mocked<ICreateProductUseCase>;
  let controller: CreateProductController;

  beforeEach(() => {
    createProductUseCase = {
      execute: jest.fn(),
    };
    controller = new CreateProductController(createProductUseCase);
  });

  it("when request is valid should return created product", async () => {
    const request: HttpRequest = {
      body: {
        name: "Product X",
        description: "A sample product",
        category: "FOOD",
      },
    };

    const expectedProduct = {
      id: 1,
      name: "Product X",
      description: "A sample product",
      category: "FOOD",
    } as any;

    createProductUseCase.execute.mockResolvedValue(expectedProduct);

    const response = await controller.handle(request);

    expect(createProductUseCase.execute).toHaveBeenCalledWith({
      name: "Product X",
      description: "A sample product",
      category: "FOOD",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedProduct);
  });
});
