module.exports = {
    apps: [
        {
            name: "web",
            script: "npm",
            args: "start",
            env: {
                PORT: 4000,
            },
        },
    ],
};
