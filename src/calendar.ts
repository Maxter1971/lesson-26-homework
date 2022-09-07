export interface IRecord {
  id: number;
  toDo: string;
  status: string;
  tag: string;
  date: string;
}

export interface iCalendar {
  localStorage: Storage;
  createRecord: (record: IRecord) => Promise<boolean>;
  updateRecord: (record: IRecord) => Promise<boolean>;
  readRecord: (id: number) => Promise<IRecord | undefined>;
  deleteRecord: (id: number) => Promise<boolean>;
  readAll: () => Promise<IRecord[]>;
  deleteAllRecords: () => Promise<boolean>;
  filterRecords: (
    toDo: string,
    status: string,
    tag: string,
    date: string
  ) => Promise<IRecord[]>;
}

export namespace Tasks {
  export class Calendar implements iCalendar {
    localStorage: Storage;

    constructor(localStorage: Storage) {
      this.localStorage = localStorage;
    }

    public async createRecord(record: IRecord) {
      let res = false;
      try {
        let findRecord = false;
        const keys = Object.keys(this.localStorage);
        let i = 0;
        while (i <= keys.length) {
          const storageItem = this.localStorage.getItem(i.toString());
          if (storageItem !== null) {
            const item: IRecord = JSON.parse(storageItem);

            if (item.id === record.id) {
              findRecord = true;
            }
          }

          i++;
        }
        if (findRecord === false) {
          this.localStorage.setItem(
            record.id.toString(),
            JSON.stringify(record)
          );
          res = true;
        }

        return res;
      } catch (error) {
        return false;
      }
    }

    public async updateRecord(record: IRecord) {
      try {
        const keys = Object.keys(this.localStorage);
        let i = 0;

        while (i <= keys.length) {
          const storageItem = this.localStorage.getItem(i.toString());
          if (storageItem !== null) {
            const item: IRecord = JSON.parse(storageItem);

            if (item.id === record.id) {
              this.localStorage.setItem(i.toString(), JSON.stringify(record));
            }
          }
          i++;
        }

        return true;
      } catch (error) {
        return false;
      }
    }

    public async deleteRecord(id: number) {
      try {
        const keys = Object.keys(this.localStorage);
        let i = 0;

        while (i <= keys.length) {
          const storageItem = this.localStorage.getItem(i.toString());
          if (storageItem !== null) {
            const item: IRecord = JSON.parse(storageItem);

            if (item.id === id) {
              this.localStorage.removeItem(i.toString());
            }
          }
          i++;
        }

        return true;
      } catch (error) {
        return false;
      }
    }

    public async deleteAllRecords() {
      try {
        this.localStorage.clear();

        return true;
      } catch (error) {
        return false;
      }
    }

    public async readAll() {
      const values: IRecord[] = [];

      const keys = Object.keys(this.localStorage);
      let i = 0;

      while (i <= keys.length) {
        const storageItem = this.localStorage.getItem(i.toString());
        if (storageItem !== null) {
          const item: IRecord = JSON.parse(storageItem);
          values.push(item);
        }

        i++;
      }

      return values;
    }

    public async readRecord(id: number) {
      let findRecord: IRecord = {
        id: -1,
        toDo: "",
        status: "",
        tag: "",
        date: "",
      };

      const keys = Object.keys(this.localStorage);
      let i = 0;

      while (i <= keys.length) {
        const storageItem = this.localStorage.getItem(i.toString());
        if (storageItem !== null) {
          const item: IRecord = JSON.parse(storageItem);

          if (item.id === id) {
            findRecord = item;
          }
        }
        i++;
      }

      return findRecord;
    }

    public async filterRecords(
      toDo: string,
      status: string,
      tag: string,
      date: string
    ) {
      const values: IRecord[] = [];

      const keys = Object.keys(this.localStorage);
      let i = 0;

      while (i <= keys.length) {
        let sourceStr = "";
        let targetStr = "";
        const storageItem = this.localStorage.getItem(i.toString());
        if (storageItem !== null) {
          const item: IRecord = JSON.parse(storageItem);
          if (toDo !== "") {
            sourceStr = sourceStr.concat(item.toDo);
            targetStr = targetStr.concat(toDo);
          }
          if (status !== "") {
            sourceStr = sourceStr.concat(item.status);
            targetStr = targetStr.concat(status);
          }
          if (tag !== "") {
            sourceStr = sourceStr.concat(item.tag);
            targetStr = targetStr.concat(tag);
          }
          if (date !== "") {
            sourceStr = sourceStr.concat(item.date);
            targetStr = targetStr.concat(date);
          }
          if (sourceStr === targetStr) {
            values.push(item);
          }
        }

        i++;
      }

      return values;
    }
  }
}
