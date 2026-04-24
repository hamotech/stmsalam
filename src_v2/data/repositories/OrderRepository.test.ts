import { OrderRepository } from "./OrderRepository";
import { OrderApiService } from "../services/api/orderApiService";
import { OrderFirebaseService } from "../services/firebase/orderFirebaseService";

describe("OrderRepository", () => {
  it("maps firebase record to domain order and syncs API", async () => {
    const firebaseService: Pick<OrderFirebaseService, "createOrder"> = {
      createOrder: async () => ({
        id: "ord_mock_2",
        itemName: "Teh Tarik",
        quantity: 1,
        createdAt: 1,
      }),
    };

    const apiService: Pick<OrderApiService, "notifyOrderPlaced"> = {
      notifyOrderPlaced: async () => undefined,
    };

    const repository = new OrderRepository(
      firebaseService as OrderFirebaseService,
      apiService as OrderApiService
    );

    const order = await repository.placeOrder({ itemName: "Teh Tarik", quantity: 1 });
    expect(order.id).toBe("ord_mock_2");
    expect(order.status).toBe("confirmed");
  });
});
