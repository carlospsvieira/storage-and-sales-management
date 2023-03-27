const sinon = require("sinon");

const salesService = require("../../../src/services/sales.services");
const salesController = require("../../../src/controllers/sales.controllers");

describe("Sales Controller", () => {
  describe("findAllSales", () => {
    it("should return 404 if no sales are found", async () => {
      const findAllSalesStub = sinon
        .stub(salesService, "findAllSales")
        .resolves(null);
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returns(res);

      await salesController.findAllSales(null, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { message: "Sale not found" });
      findAllSalesStub.restore();
    });

    it("should return a list of sales", async () => {
      const sales = [
        { saleId: 1, productId: 1, quantity: 10, date: "2022-03-21" },
      ];
      const findAllSalesStub = sinon
        .stub(salesService, "findAllSales")
        .resolves(sales);
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returns(res);

      await salesController.findAllSales(null, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, sales);
      findAllSalesStub.restore();
    });
  });
});
