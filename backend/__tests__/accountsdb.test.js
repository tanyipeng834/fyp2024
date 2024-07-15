const { getAllAccounts } = require("../src/accountsdb");
const supabase = require("../src/config/supabaseConfig");

jest.mock("../src/config/supabaseConfig", () => ({
    from: jest.fn(),
}));

let consoleErrorSpy;

beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

describe("getAllAccounts", () => {
    const expectedResult = [
        {
            userid: 1,
            firstname: "Mary",
            lastname: "Brown",
            email: "mary.brown@example.com",
            role: "admin",
            age: "Millennials (25-40)",
            gender: "Female",
            datecreated: "2024-07-13T16:11:18.442052+00:00",
        },
    ];

    it("calls supabase.from with 'accounts'", async () => {
        const mockSelect = jest.fn()
            .mockResolvedValue({ data: expectedResult, error: null });

        supabase.from.mockReturnValue({ select: mockSelect });

        await getAllAccounts();
        expect(supabase.from).toHaveBeenCalledWith("accounts");
    });

    it("returns all accounts", async () => {
        const mockSelect = jest.fn()
            .mockResolvedValue({ data: expectedResult, error: null });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await getAllAccounts();
        expect(accounts).toEqual(expectedResult);
    });

    it("handles error correctly and logs it to console.error", async () => {
        const mockSelect = jest.fn()
            .mockResolvedValue({ data: null, error: "Some error" });

        supabase.from.mockReturnValue({ select: mockSelect });

        const accounts = await getAllAccounts();
        expect(accounts).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith("Some error");
    });
});