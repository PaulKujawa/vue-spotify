export const webStorage = {
  getItem<T>(id: string): T | undefined {
    try {
      const stored = sessionStorage.getItem(id);

      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      this.removeItem(id);
    }
  },
  setItem(id: string, value: any): void {
    const toBeStore = JSON.stringify(value);
    sessionStorage.setItem(id, toBeStore);
  },
  removeItem(id: string): void {
    sessionStorage.removeItem(id);
  }
};
