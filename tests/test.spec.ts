import dotenv from "dotenv";

import FTL from "../src/index";

dotenv.config();

describe("FTL", () => {
  it("should return an error if no dealer ID is provided", async () => {
    const ftl = new FTL(process.env.API_URL as string, process.env.API_KEY as string);
    // @ts-ignore
    const result = await ftl.validateMerchant({});
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Please provide a valid dealer_id - 1")
  });
  it("should return error if dealer id is invalid", async () => {
    const ftl = new FTL(process.env.API_URL as string, process.env.API_KEY as string);
    const result = await ftl.validateMerchant({ dealerID: "FAKE_ID" });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Please provide a valid dealer_id - 2")
  });
  it("should return error if api key id is invalid", async () => {
    const ftl = new FTL(process.env.API_URL as string, "xxxxx");
    const result = await ftl.validateMerchant({ dealerID: process.env.DEALER_ID as string });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Please provide a valid api_key - 2")
  });
  it("should return error if api key id is invalixxd", async () => {
    const ftl = new FTL(process.env.API_URL as string, process.env.API_KEY as string);
    const result = await ftl.validateMerchant({ dealerID: "C214235" });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Please provide a valid dealer_id - 3")
  });
  it("should return an error if no apiKey is provided", async () => {
    // @ts-ignore
    const ftl = new FTL(process.env.API_URL as string);
    const result = await ftl.validateMerchant({ dealerID: "FAKE_ID" });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Please provide a valid api_key - 1")
  })
  it("should validate merchant correctly", async () => {
    const ftl = new FTL(
      process.env.API_URL as string,
      process.env.API_KEY as string
    );
    const result = await ftl.validateMerchant({ dealerID: process.env.DEALER_ID as string });
    expect(result.isValid).toBe(true);
    expect(result.error).toBe(undefined);
  });

});
