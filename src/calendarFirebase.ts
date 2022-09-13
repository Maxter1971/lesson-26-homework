import {
  ref,
  remove,
  get,
  child,
  set,
  Database,
  update,
  DatabaseReference,
  DataSnapshot,
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
  storageName:string;

  createRecord: (record: IRecord) => Promise<boolean>;
  updateRecord: (record: IRecord) => Promise<boolean>;
  readRecord: (id: number) => Promise<IRecord> | undefined;
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

    storageName:string;

    constructor(db: Database, dbRef: DatabaseReference,storageName:string) {
      this.db = db;
      this.dbRef = dbRef;
      this.storageName = storageName;  
    }

    public async createRecord(record: IRecord) {
      let result = false;
      try {

        const snapshot:DataSnapshot = await 
        get(child(this.dbRef, this.storageName));
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const res: IRecord[] = snapshot.val();
          if (res[record.id] === undefined) {
            const insertRec = await
            set(ref(this.db, this.storageName
            .concat('/',record.id.toString())), record);
            result = true;
          }
        }
        else {
          const insertRec = await
          set(ref(this.db, this.storageName
          .concat('/',record.id.toString())), record);
          result = true;         
        }
        return result;
      } catch (error) {
        return false;
      }
    }

    public async updateRecord(record: IRecord) {
      let result = false;
      try {
        const snapshot:DataSnapshot = await 
          get(child(this.dbRef, this.storageName));
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const res: IRecord[] = snapshot.val();
            if (res[record.id] !== undefined) {
              const updateRec = await update(
                ref(this.db, this.storageName.concat('/',record.id.toString())),
                record
              );
              result = true;   
            }
          }        

        return result;
      } catch (error) {
        return false;
      }
    }

    public async deleteRecord(id: number) {
      let result = false;
      try {
        const snapshot:DataSnapshot = await 
          get(child(this.dbRef, this.storageName));
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const res: IRecord[] = snapshot.val();
            if (res[id] !== undefined) {
              const delRec = await remove(
                ref(this.db, this.storageName.concat('/',id.toString()))
                
              );
              result = true;  
            }
          }  

        return result;
      } catch (error) {
        return false;
      }
    }

    public async deleteAllRecords() {
      let result = false;
      try {
        const snapshot:DataSnapshot = await 
        get(child(this.dbRef, this.storageName));
        if (snapshot.exists()) {
          const delRec = await remove(ref(this.db, this.storageName));
          
          result = true; 
        }  
        

        return result;
      } catch (error) {
        return false;
      }
    }

    public async readAll() {
      let values: IRecord[] = [];

      const snapshot:DataSnapshot = await 
      get(child(this.dbRef, this.storageName));
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        values = snapshot.val();
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

      const snapshot:DataSnapshot = await 
      get(child(this.dbRef, this.storageName));
        if (snapshot.exists()) {
          const values: IRecord[] = snapshot.val();
          findRecord = values[id];
          // console.log(findRecord);
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

      const snapshot:DataSnapshot = await 
      get(child(this.dbRef, this.storageName));
        if (snapshot.exists()) {

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
                // console.log(sourceStr,targetStr);
                values.push(item);
              }
            }

            i++;
          }
        }

      return values;
    }
  }
}
