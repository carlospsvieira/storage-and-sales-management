const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/sales.models");

describe("Testing inside sales models", () => {
  it("returns the insertId of a newly created sale", async () => {
    const executeStub = sinon
      .stub(connection, "execute")
      .resolves([{ insertId: 1 }]);

    const result = await salesModel.newSaleId();

    expect(executeStub.calledOnce).to.be.true;
    expect(result).to.equal(1);

    executeStub.restore();
  });

  it("throws an error if the query fails", async () => {
    const executeStub = sinon
      .stub(connection, "execute")
      .rejects(new Error("Query failed"));

    try {
      await salesModel.newSaleId();
    } catch (error) {
      expect(executeStub.calledOnce).to.be.true;
      expect(error.message).to.equal("Query failed");
    }

    executeStub.restore();
  });
});

describe("insertNewSale", () => {
  it("executes the correct query to insert a new sale product", async () => {
    const executeStub = sinon.stub(connection, "execute").resolves();

    await salesModel.insertNewSale({ id: 1, productId: 2, quantity: 3 });

    expect(executeStub.calledOnce).to.be.true;
    expect(executeStub.args[0][0]).to.equal(
      "INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)"
    );
    expect(executeStub.args[0][1]).to.deep.equal([1, 2, 3]);

    executeStub.restore();
  });

  it("throws an error if the query fails", async () => {
    const executeStub = sinon
      .stub(connection, "execute")
      .rejects(new Error("Query failed"));

    try {
      await salesModel.insertNewSale({ id: 1, productId: 2, quantity: 3 });
    } catch (error) {
      expect(executeStub.calledOnce).to.be.true;
      expect(error.message).to.equal("Query failed");
    }

    executeStub.restore();
  });
});
