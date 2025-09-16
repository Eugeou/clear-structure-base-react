type StorageValue = string | number | boolean | object | null;

interface IClientStorage {
  setItem<T extends StorageValue>(key: string, value: T): void;
  getItem<T extends StorageValue>(key: string, defaultValue?: T): T | null;
  removeItem(key: string): void;
  clear(): void;
  getKeys(): string[];
}

class ClientStorage implements IClientStorage {
  private isStorageAvailable(): boolean {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn("Client Storage is not available:", e);
      return false;
    }
  }

  setItem<T extends StorageValue>(key: string, value: T): void {
    if (!this.isStorageAvailable()) return;
    try {
      const serializedValue =
        value === null ? "null" : typeof value === "object" ? JSON.stringify(value) : String(value);
      localStorage.setItem(key, serializedValue);
    } catch {
      console.warn("Failed to set item:", key, value);
    }
  }

  getItem<T extends StorageValue>(
    key: string,
    defaultValue: T | null = null
  ): T | null {
    if (!key) throw new Error("Key cannot be empty");
    if (!this.isStorageAvailable()) return defaultValue;
    try {
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      if (value === "null") return null as T;

      try {
        return JSON.parse(value) as T;
      } catch {
        // If JSON.parse fails, return the string if it is a string
        return (typeof value === "string" ? value : defaultValue) as T;
      }
    } catch (error) {
      console.error(`Error getting item ${key} from Client Storage:`, error);
      return defaultValue;
    }
  }

  removeItem(key: string): void {
    if (!this.isStorageAvailable()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from Client Storage:`, error);
    }
  }

  clear(): void {
    if (!this.isStorageAvailable()) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing Client Storage:", error);
    }
  }

  getKeys(): string[] {
    if (!this.isStorageAvailable()) return [];
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key !== null) {
          keys.push(key);
        }
      }
      return keys;
    } catch (error) {
      console.error("Error getting keys from Client Storage:", error);
      return [];
    }
  }
}

const ClientStorageService = new ClientStorage();
export default ClientStorageService;