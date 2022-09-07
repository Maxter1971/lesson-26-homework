import { IRecord, Tasks } from "./calendar";

describe("calendar localstorage tests", () => {
  it("calendar localstorage tests", async () => {
    localStorage.clear();
    const calendar = new Tasks.Calendar(localStorage);
    expect(calendar).toBeDefined();
    expect(calendar).toBeInstanceOf(Object);
    let createRecord = await calendar.createRecord({
      id: 0,
      toDo: "Task0",
      status: "Progress",
      tag: "Tasks",
      date: "31.08.2022",
    });

    const data: IRecord[] = await calendar.readAll();

    expect(createRecord).toBeTruthy();
    expect(data.length).toBe(1);
    expect(data[0].id).toBe(0);
    expect(data[0].toDo).toBe("Task0");

    createRecord = await calendar.createRecord({
      id: 1,
      toDo: "Task1",
      status: "Progress",
      tag: "Tasks",
      date: "31.08.2022",
    });

    const data1: IRecord[] = await calendar.readAll();

    expect(data1.length).toBe(2);
    expect(data1[1].id).toBe(1);

    createRecord = await calendar.updateRecord({
      id: 1,
      toDo: "Task11",
      status: "Progress1",
      tag: "Tasks",
      date: "31.08.2022",
    });

    const findRecord = await calendar.readRecord(1);
    expect(findRecord.status).toBe("Progress1");

    createRecord = await calendar.deleteRecord(0);

    const data3: IRecord[] = await calendar.readAll();
    expect(data3.length).toBe(1);

    createRecord = await calendar.createRecord({
      id: 2,
      toDo: "Task2",
      status: "Progress",
      tag: "Tasks",
      date: "31.08.2022",
    });

    createRecord = await calendar.createRecord({
      id: 0,
      toDo: "Task0",
      status: "Progress",
      tag: "Tasks",
      date: "31.08.2022",
    });

    const findRecords = await calendar.filterRecords(
      "Task0",
      "Progress",
      "",
      ""
    );
    expect(findRecords.length).toBe(1);
    expect(findRecords[0].id).toBe(0);

    const findRecords1 = await calendar.filterRecords("", "", "", "31.08.2022");

    expect(findRecords1.length).toBe(3);

    await calendar.deleteAllRecords();

    const data4: IRecord[] = await calendar.readAll();
    expect(data4.length).toBe(0);
  });
});
