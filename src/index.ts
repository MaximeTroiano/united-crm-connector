import API from "./API";

let x = new API();

const test = async () => {
    console.log("[TEST] Started");
    let start = new Date().getTime();
    x.debug_level = 3;

    await x.login("Maxime", "test");

    let company = await x.save("customers", { name: "Maxime's Company", vat: "BE0589.625.366" });

    //await x.find("customers");

    await x.findOne("customers", { name: "Maxime's Company" });

    await x.findById("customers", company.id);

    await x.remove("customers", company.id);

    //await x.config("customers");

    //await x.config();

    console.log(`[TESTS] Ended after ${new Date().getTime() - start}ms`);
};

test();
