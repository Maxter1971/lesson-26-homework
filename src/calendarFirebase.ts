import {
  ref,
  remove,
  get,
  child,
  set,
  Database,
  update,
  DatabaseReference,
} from "firebase/database";

export interface IRecord {
  id: number;
  toDo: string;
  status: string;
  tag: string;
  date: string;
}

export interface iCalendar {
  db: Database;
  dbRef: DatabaseReference;

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

export namespace TasksFireBase {
  export class Calendar implements iCalendar {
    db: Database;

    dbRef: DatabaseReference;

    constructor(db: Database, dbRef: DatabaseReference) {
      this.db = db;
      this.dbRef = dbRef;
    }

    public async createRecord(record: IRecord) {
      let res = false;
      try {
        let findRecord = false;
        get(child(this.dbRef, "tasks")).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const res: IRecord[] = snapshot.val();
            if (res[record.id] !== undefined) {
              findRecord = true;
            }
          }
        });

        if (findRecord === false) {
          set(ref(this.db, "tasks/".concat(record.id.toString())), record).then(
            () => {
              res = true;
            }
          );
        }

        return res;
      } catch (error) {
        return false;
      }
    }

    public async updateRecord(record: IRecord) {
      try {
        get(child(this.dbRef, "tasks")).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const res: IRecord[] = snapshot.val();
            if (res[record.id] !== undefined) {
              update(
                ref(this.db, "tasks/".concat(record.id.toString())),
                record
              );
            }
          }
        });

        return true;
      } catch (error) {
        return false;
      }
    }

    public async deleteRecord(id: number) {
      try {
        remove(ref(this.db, "tasks/".concat(id.toString())));

        return true;
      } catch (error) {
        return false;
      }
    }

    public async deleteAllRecords() {
      try {
        remove(ref(this.db, "tasks"));

        return true;
      } catch (error) {
        return false;
      }
    }

    public async readAll() {
      let values: IRecord[] = [];

      get(child(this.dbRef, "tasks")).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          values = snapshot.val();
        }
      });

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

      get(child(this.dbRef, "tasks")).then((snapshot) => {
        if (snapshot.exists()) {
          const values: IRecord[] = snapshot.val();
          findRecord = values[id];
          console.log(findRecord);
        }
      });

      return findRecord;
    }

    public async filterRecords(
      toDo: string,
      status: string,
      tag: string,
      date: string
    ) {
      const values: IRecord[] = [];

      get(child(this.dbRef, "tasks")).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          let i = 0;

          while (i <= data.length) {
            let sourceStr = "";
            let targetStr = "";
            const storageItem = data[i];
            if (storageItem !== undefined) {
              const item: IRecord = storageItem;
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
        }
      });

      return values;
    }
  }
}
