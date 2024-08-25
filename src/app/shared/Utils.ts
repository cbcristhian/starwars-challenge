export class Utils {
  public static set(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public static get(key: string) {
    let item = localStorage.getItem(key);

    return item;
  }

  public static delete(key: string) {
    localStorage.removeItem(key);
  }

  public static deleteAll() {
    localStorage.clear();
  }
}
