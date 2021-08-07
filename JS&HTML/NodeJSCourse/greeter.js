function greet(name, cb) {
    const message = `Hi ${name}`;

    console.log(message);
    cb(message);
}

function formalGreet(name) {
    console.log(`Hello, ${name} ! How do you do ?`);
}

module.exports = {
    greet,
    formalGreet
};