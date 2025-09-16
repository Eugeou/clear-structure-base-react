import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage, RESET } from "jotai/utils";

const caches: Record<string, any> = {};

function useLocalItem<T>(
  keyname: string,
  defaultValue?: T
): {
  value: T;
  setValue: (value: T) => void;
  deleteValue: () => void;
} {
  const atom = getLocalItem(keyname, defaultValue);
  const [value, setValue] = useAtom<T>(atom);
  return {
    value,
    setValue,
    deleteValue: () => {
      setValue(RESET as T);
    },
  };
}

function getLocalItem<T>(keyname: string, defaultValue: T) {
  if (hasItem(keyname)) return caches[keyname];
  const storage = createJSONStorage<T>(() => localStorage);
  const atom = atomWithStorage<T>(keyname, defaultValue, storage);

  caches[keyname] = atom;
  return atom;
}

function hasItem(keyname: string) {
  return Object.keys(caches).includes(keyname);
}

function getAllItems(): Record<string, any> {
  const result: Record<string, any> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      try {
        const value = localStorage.getItem(key);
        result[key] = value ? JSON.parse(value) : null;
      } catch {
        result[key] = null;
      }
    }
  }
  return result;
}

export const LocalStorageService = {
  useLocalItem,
  getAllItems,
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export const handleRemove = (
  k: string,
  setMessage: (message: string) => void,
  updateKeys: () => void
) => {
  try {
    LocalStorageService.removeItem(k);
    setMessage(`Success: Key ${k} removed`);
    updateKeys();
  } catch (e: unknown) {
    setMessage(
      `Error: Failed to remove key: ${e instanceof Error ? e.message : String(e)}`
    );
  }
};
