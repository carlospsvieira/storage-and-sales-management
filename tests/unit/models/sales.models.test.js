const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { newSaleId, insertNewSale } = require("../../../src/models/sales.models");

describe("sales.models", () => {
  describe("newSaleId", () => {
    it("should insert a new sale and return the insert ID", async () => {
      const executeStub = sinon
        .stub(connection, "execute")
        .resolves([{ insertId: 1 }]);
      const insertId = await newSaleId();
      expect(insertId).to.equal(1);
      sinon.assert.calledOnce(executeStub);
      sinon.assert.calledWithExactly(
        executeStub,
        "INSERT INTO StoreManager.sales (date) VALUES (NOW())"
      );
      executeStub.restore();
    });
  });

  describe("insertNewSale", () => {
    it("should insert a new sale and return the result object", async () => {
      const executeStub = sinon
        .stub(connection, "execute")
        .resolves([{ result: {} }]);
      const result = await insertNewSale({ id: 1, productId: 2, quantity: 3 });
      expect(result).to.deep.equal({});
      sinon.assert.calledOnce(executeStub);
      sinon.assert.calledWithExactly(
        executeStub,
        "INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)",
        [1, 2, 3]
      );
      executeStub.restore();
    });
  });
});
