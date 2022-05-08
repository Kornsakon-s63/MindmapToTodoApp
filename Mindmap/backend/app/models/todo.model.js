module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
        priority: {
            type: Sequelize.BOOLEAN
        },
        duedate: {
            type: Sequelize.STRING
        }
    });

    return Todo;
};