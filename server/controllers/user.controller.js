import User from '../models/user.model';
import _ from 'lodash';
import errorHandler from './../helpers/dbErrorHandler';

const create = (req, res, next) => {
    const user = new User(req.body);
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: "Succesfully signed up!"
        });
    });
};

const userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found."
            });
        }
        req.profile = user;
        next();
    })
};

const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

const list = (req, res, next) => {
    User.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        res.json(users)
    }).select('name email updated created');
};

const update = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    });
    next();
};

const remove = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deleted_user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }
        deleted_user.hashed_password = undefined;
        deleted_user.salt = undefined;
        res.json(deleted_user)
    });
};

export default {
    create,
    userByID,
    read,
    list,
    update,
    remove
}