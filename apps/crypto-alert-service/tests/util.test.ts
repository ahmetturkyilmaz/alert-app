import {getResponse} from "../src/utils/getResponse";

describe("getResponse Utility", () => {
    it("should return a success response with the correct format", () => {
        const data = [{user: 1, condition: ">", targetPrice: 5000, symbol: "BTCUSDT"}];

        const result = getResponse.success(data);

        expect(result).toEqual({
            resultCode: "SUCCESS",
            data,
        });
    });
});
