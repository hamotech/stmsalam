import { PlaceOrderUseCase } from "./placeOrder";
import { IOrderRepository } from "../repositories/IOrderRepository";
import { Order, PlaceOrderInput } from "../entities/Order";

class FakeOrderRepository implements IOrderRepository {
  async placeOrder(input: PlaceOrderInput): Promise<Order> {
    return {
      id: "ord_test_1",
      itemName: input.itemName,
      quantity: input.quantity,
      createdAt: Date.now(),
      status: "confirmed",
    };
  }
}

describe("PlaceOrderUseCase", () => {
  it("places a valid order", async () => {
    const useCase = new PlaceOrderUseCase(new FakeOrderRepository());
    const result = await useCase.execute({ itemName: "Teh O", quantity: 2 });

    expect(result.itemName).toBe("Teh O");
    expect(result.quantity).toBe(2);
    expect(result.status).toBe("confirmed");
  });

  it("throws when item name is empty", async () => {
    const useCase = new PlaceOrderUseCase(new FakeOrderRepository());
    await expect(useCase.execute({ itemName: " ", quantity: 1 })).rejects.toThrow(
      "Item name is required."
    );
  });
});
