import { hashPassword, comparePassword } from "../../utils/hash";

describe("Hash Utility", () => {
  it("should hash and compare password correctly", async () => {
    const password = "mypassword";
    const hashed = await hashPassword(password);
    const isMatch = await comparePassword(password, hashed);

    expect(isMatch).toBe(true);
  });
});
