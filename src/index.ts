import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  remove,
  get,
  child,
  set,
  Database,
  update,
  DatabaseReference,
} from "firebase/database";
import { Tasks } from "./calendar";
import { TasksFireBase } from "./calendarFirebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDztEYUqhgQWp20lUlE4Oa6b6F6bi1ciao",
  authDomain: "calendar-a67a6.firebaseapp.com",
  projectId: "calendar-a67a6",
  storageBucket: "calendar-a67a6.appspot.com",
  messagingSenderId: "418921506915",
  appId: "1:418921506915:web:e36ea70821d336bf567056",
  measurementId: "G-45CNYFFF1Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db: Database = getDatabase();

const dbRef: DatabaseReference = ref(getDatabase());

const calendar = new TasksFireBase.Calendar(db, dbRef, "calendar");
const calendar1 = new TasksFireBase.Calendar(db, dbRef, "calendar1");

const delAll = await calendar.deleteAllRecords();
const delAll1 = await calendar1.deleteAllRecords();

let createRecord = await calendar.createRecord({
  id: 0,
  toDo: "Task0",
  status: "Progress",
  tag: "Tasks",
  date: "31.08.2022",
});
console.log(createRecord);

createRecord = await calendar.createRecord({
  id: 1,
  toDo: "Task1",
  status: "Progress",
  tag: "Tasks",
  date: "31.08.2022",
});
console.log(createRecord);

createRecord = await calendar1.createRecord({
  id: 0,
  toDo: "Task0",
  status: "Progress",
  tag: "Tasks",
  date: "31.08.2022",
});
console.log(createRecord);

createRecord = await calendar.updateRecord({
  id: 1,
  toDo: "Task11",
  status: "Progress1",
  tag: "Tasks",
  date: "31.08.2022",
});
console.log(createRecord);

createRecord = await calendar.deleteRecord(0);
console.log(createRecord);

createRecord = await calendar.createRecord({
  id: 2,
  toDo: "Task2",
  status: "Progress",
  tag: "Tasks",
  date: "31.08.2022",
});
console.log(createRecord);

createRecord = await calendar.createRecord({
  id: 0,
  toDo: "Task0",
  status: "Progress",
  tag: "Tasks",
  date: "31.08.2022",
});
console.log(createRecord);

const allRecords = await calendar.readAll();
console.log(allRecords);

const findRecord = await calendar.readRecord(1);
console.log(findRecord);

const findRecords = await calendar.filterRecords("Task11", "", "", "");
console.log(findRecords);
const findRecords1 = await calendar.filterRecords("", "", "", "31.08.2022");
console.log(findRecords1);
