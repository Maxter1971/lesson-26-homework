export interface IRecord {
  id: number;
  toDo: string;
  status: string;
  tag: string;
  date: string;
}

export interface iCalendar {
  localStorage: Storage;
  storageName: string;
  createRecord: (record: IRecord) => boolean;
  updateRecord: (record: IRecord) => boolean;
  readRecord: (id: number) => IRecord | undefined;
  deleteRecord: (id: number) => boolean;
  readAll: () => IRecord[];
  deleteAllRecords: () => boolean;
  filterRecords: (
    toDo: string,
    status: string,
    tag: string,
    date: string
  ) => IRecord[];
}

export namespace Tasks {
  export class Calendar implements iCalendar {
    localStorage: Storage;

    storageName: string;

    constructor(localStorage: Storage, storageName: string) {
      this.localStorage = localStorage;
      this.storageName = storageName;
    }

    public createRecord(record: IRecord) {
      let res = false;
      try {
        const storageItem = this.localStorage.getItem(
          this.storageName.concat("_", record.id.toString())
        );
        if (storageItem === null) {
          this.localStorage.setItem(
            this.storageName.concat("_", record.id.toString()),
            JSON.stringify(record)
          );
          res = true;
        }

        return res;
      } catch (error) {
        return false;
      }
    }

    public updateRecord(record: IRecord) {
      let res = false;
      try {
        const storageItem = this.localStorage.getItem(
          this.storageName.concat("_", record.id.toString())
        );
        if (storageItem !== null) {
          this.localStorage.setItem(
            this.storageName.concat("_", record.id.toString()),
            JSON.stringify(record)
          );
          res = true;
        }

        return res;
      } catch (error) {
        return false;
      }
    }

    public deleteRecord(id: number) {
      let res = false;
      try {
        const storageItem = this.localStorage.getItem(
          this.storageName.concat("_", id.toString())
        );
        if (storageItem !== null) {
          console.log(storageItem);

          this.localStorage.removeItem(
            this.storageName.concat("_", id.toString())
          );
          res = true;
        }

        return res;
      } catch (error) {
        return false;
      }
    }

    public deleteAllRecords() {
      try {
        const keys = Object.keys(this.localStorage);
        const filterKeys = keys.filter(
          (key) => key.includes(this.storageName.concat("_")) === true
        );
        console.log(keys);
        console.log(filterKeys);
        filterKeys.forEach((k) => {
          const storageItem = this.localStorage.getItem(k);
          if (storageItem !== null) {
            this.localStorage.removeItem(k);
          }
        });

        return true;
      } catch (error) {
        return false;
      }
    }

    public readAll() {
      const values: IRecord[] = [];

      const keys = Object.keys(this.localStorage);
      const filterKeys = keys.filter(
        (key) => key.includes(this.storageName.concat("_")) === true
      );
      console.log(keys);
      console.log(filterKeys);
      filterKeys.forEach((k) => {
        const storageItem = this.localStorage.getItem(k);
        if (storageItem !== null) {
          const item: IRecord = JSON.parse(storageItem);
          values.push(item);
        }
      });

      return values;
    }

    public readRecord(id: number) {
      let findRecord: IRecord = {
        id: -1,
        toDo: "",
        status: "",
        tag: "",
        date: "",
      };

      const storageItem = this.localStorage.getItem(
        this.storageName.concat("_", id.toString())
      );
      if (storageItem !== null) {
        findRecord = JSON.parse(storageItem);
      }

      return findRecord;
    }

    public filterRecords(
      toDo: string,
      status: string,
      tag: string,
      date: string
    ) {
      const values: IRecord[] = [];

      let keys = Object.keys(this.localStorage);
      keys = keys.filter(
        (key) => key.includes(this.storageName.concat("_")) === true
      );
      keys.forEach((k) => {
        let sourceStr = "";
        let targetStr = "";
        const storageItem = this.localStorage.getItem(k);
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
      });

      return values;
    }
  }
}
