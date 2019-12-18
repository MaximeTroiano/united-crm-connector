import API from "./API";

let x = new API("http://localhost:4000");

const test = async () => {
    console.log("[TEST] Started");
    let start = new Date().getTime();
    x.debug_level = 3;

    await x.login("Maxime", "test");

    x.onError = (error: any) => {
        console.log("Custom error handling is working !!", error);
    };

    x.onSave = (entity: string, data: object) => {
        console.log("Custom save function", entity, data);
    };

    x.api_timeout = 100000;
    let file = await x.downloadFile(361);

    console.log("file", file);

    //await x.find("users");

    //await x.saveRelated("customers", 1, "employees", 2);

    //await x.findRelated("customers", 1, "employees", {}, "firstname desc");

    //await x.impersonate(3);

    //let company = await x.save("customers", { name: "gaëtan's Company", vat: "BE0589.625.366" });
    //await x.find("customers");

    //await x.findOne("customers", { name: "Maxime's Company" });

    //await x.findById("customers", company.data.id);

    //await x.search("customers", "Maxime");

    //await x.remove("customers", company.data.id);

    //await x.config("customers");

    //await x.config();

    console.log(`[TESTS] Ended after ${new Date().getTime() - start}ms`);
};

test();
