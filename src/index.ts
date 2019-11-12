import API from "./API";

let x = new API();

const test = async () => {
    await x.login("Maxime", "test");

    await x.find("customers");

    await x.findOne("customers", { name: "Mars" });

    await x.findById("customers", 1);
};

test();
