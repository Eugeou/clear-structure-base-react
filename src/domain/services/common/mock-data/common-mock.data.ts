/**
 * Common mock data
 */

export const CommonMockData = {
    data_getter : () => {
        return {
            keys: ["test"],
            item: "test",
        };
    },
    data_setter : (_key: string, _value: string) => {
        return {
            keys: ["test"],
            item: "test",
        };
    },
    data_remover : (_key: string) => {
        return {
            keys: ["test"],
            item: "test",
        };
    },
    data_clearer : () => {
        return {
            keys: ["test"],
            item: "test",
        };
    },
};