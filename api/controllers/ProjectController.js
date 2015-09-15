/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req,res){
        var userId = req.user.id
        var name = req.body.name;
        var description = req.body.description;
        Project.create({
            name:name,
            description:description
        }).then(function(project){
            User.findOne({where: {id:userId}).then(function(user){
                project.users.add(user);
                user.projects.add(project);
                user.save();
                return project.save();
            }).then(function(){
                return Project.findOne({
                    where:{
                        name:name
                    }
                }).populate('users');
            }).then(function(project){
                console.log(project.id)
                res.send(project);
            })
            .catch(console.error);
        });
    }

};

