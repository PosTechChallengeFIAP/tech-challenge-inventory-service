import { CreatePocUseCase } from "./CreatePocUseCase";
import { IPocRepository } from "@domain/repositories/IPocRepository";
import { TCreatePocUseCaseRequest } from "./TCreatePocUseCase";
import { EPocCategory } from "@domain/models/EPocCategory";
import { IPoc } from "@application/DTOs/poc";

describe("CreatePocUseCase", () => {
  let useCase: CreatePocUseCase;
  let mockPocRepository: jest.Mocked<IPocRepository>;

  const mockRequest: TCreatePocUseCaseRequest = {
    name: "Test PDV",
    description: "Test Description",
    category: EPocCategory.BAR
  };

  const mockSavedPoc: IPoc = {
    id: 1,
    name: "Test PDV",
    description: "Test Description",
    category: EPocCategory.BAR,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockPocRepository = {
      save: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
    };
    useCase = new CreatePocUseCase(mockPocRepository);
  });

  it("when execute is called should create and return the new Poc", async () => {
    mockPocRepository.save.mockResolvedValue(mockSavedPoc);

    const result = await useCase.execute(mockRequest);

    expect(mockPocRepository.save).toHaveBeenCalledWith({
      name: mockRequest.name,
      description: mockRequest.description,
      category: mockRequest.category,
    });

    expect(result).toEqual(mockSavedPoc);
  });
});
