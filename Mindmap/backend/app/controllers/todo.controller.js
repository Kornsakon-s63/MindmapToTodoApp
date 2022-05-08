const db = require("../models");
const todo_list = db.todo_list;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const todo = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published :false,
        priority: req.body.priority ? req.body.priority :false,
        duedate: req.body.duedate
    };

    todo_list.create(todo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Todo."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: '%${title}%' } } : null;

    todo_list.findAll({ where: condition , order: [['priority', 'desc']] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Todo."
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    todo_list.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some retrieving Todo with id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    todo_list.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Todo was updated successfully."
                });
            }
            else {
                res.send({
                    message: `Cannot update Todo with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating todo with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    todo_list.destroy({
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            }
            else {
                res.send({
                    message: `Cannot delete Todo with id=${id}. Maybe todo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete todo with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    todo_list.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Todo were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all todo."
            });
        });
};

exports.findAllPublished = (req, res) => {
    todo_list.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Some error occured while retrieving todo."
            });
        });
};

