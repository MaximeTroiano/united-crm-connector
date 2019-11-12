import API from "./API";

let x = new API();

const test = async () => {
    await x.login("Maxime", "test");

    await x.find("customers");

    await x.findOne("customers", { name: "Mars" });

    await x.findById("customers", 1);

    let company = await x.save("customers", { name: "Maxime's Company", vat: "BE0589.625.366" });

    await x.remove("customers", company.id);

    await x.config("customers");

    await x.config();
};

test();
