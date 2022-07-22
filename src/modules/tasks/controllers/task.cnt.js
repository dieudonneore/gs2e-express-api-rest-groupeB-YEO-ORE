const TaskModel = require('../models/task.model')

class TaskController{

    // creation de tache
    static createTask (req, res){
        const task = new TaskModel({
            titre: req.body.titre,
            description:req.body.description,
            etat:req.body.etat
        });
        return task.save().then(data => {
            res.json(data)
        }).catch(err=>{
            console.log('errr')
        })
    };

    // lire toutes les taches
    static findAllTask(req, res){
        const task = TaskModel.find().then(data=>{
            res.status(200).json(data)
        }).catch(err=> {
            console.log('error')
        })
        return task
    };

    //  rechercher taches par id
    static findOneTask(req, res){
        const task = TaskModel.findById(req.params.id).then(data=> res.json(data));
        return task

    };


    // mettre à jour une tache
    static updateTask(req, res){
        
        const id = req.params.id;
        let taskUpdated = TaskModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
            res.json(data)
        }).catch(err => {
            console.log("erreur")
        })
        
        return taskUpdated
    };

// supprimer une tache
    static deleteTask(req, res){
        TaskModel.findByIdAndRemove(req.params.id).then(data => {
            if (!data) {
              res.status(404).send({
                message: `Task not found.`
              });
            } else {
              res.send({
                message: "Task deleted successfully!"
              });
            }
        }).catch(err => {
            res.status(500).send({
              message: err.message
            });
        });

    };
}
module.exports = TaskController