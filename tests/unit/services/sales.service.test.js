const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.models");
const salesService = require("../../../src/services/sales.services");

describe("Sales service", () => {
  describe("findAllSales", () => {
    it("should return an array of sales", async () => {
      const expectedSales = [
        { saleId: 1, productId: 1, quantity: 2, date: "2022-01-01" },
        { saleId: 1, productId: 2, quantity: 1, date: "2022-01-01" },
        { saleId: 2, productId: 1, quantity: 3, date: "2022-01-02" },
        { saleId: 2, productId: 3, quantity: 2, date: "2022-01-02" },
      ];

      const findAllSalesStub = sinon
        .stub(salesModel, "findAllSales")
        .resolves(expectedSales);

      const result = await salesService.findAllSales();

      expect(result).to.deep.equal(expectedSales);

      findAllSalesStub.restore();
    });

    it("should return an empty array if no sales are found", async () => {
      const expectedSales = [];

      const findAllSalesStub = sinon
        .stub(salesModel, "findAllSales")
        .resolves(expectedSales);

      const result = await salesService.findAllSales();

      expect(result).to.deep.equal(expectedSales);

      findAllSalesStub.restore();
    });
  });

  describe("findSalesById", () => {
    it("should return the sales with the specified ID", async () => {
      const saleId = 1;

      const expectedSales = [
        { productId: 1, quantity: 2, date: "2022-01-01" },
        { productId: 2, quantity: 1, date: "2022-01-01" },
      ];

      const findSalesByIdStub = sinon
        .stub(salesModel, "findSalesById")
        .resolves(expectedSales);

      const result = await salesService.findSalesById(saleId);

      expect(result).to.deep.equal(expectedSales);

      findSalesByIdStub.restore();
    });

    it("should return an empty array if no sales are found with the specified ID", async () => {
      const saleId = 1;

      const expectedSales = [];

      const findSalesByIdStub = sinon
        .stub(salesModel, "findSalesById")
        .resolves(expectedSales);

      const result = await salesService.findSalesById(saleId);

      expect(result).to.deep.equal(expectedSales);

      findSalesByIdStub.restore();
    });
  });
});
