// let now = new Date("2025-08-24");
for (let i = 0; i < 60; i++) {
    let now = new Date("2025-08-24");
    now.setDate(now.getDate() + i);
    let date = `${
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
    }`;
    // console.log(date);
}

const sd = new Date("2025-08-24");
const td = new Date("2025-09-04");

console.log(new Date(td - sd)/86400000);
