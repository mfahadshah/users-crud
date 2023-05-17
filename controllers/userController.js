const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");

const User = require("../models/User");

const { JWT_SECRET } = require("../config");
const { ValidationErrors } = require("../helpers/ValidationErrors");

const CreateUser = async (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    if (!errorsList.isEmpty())
      return res.status(400).json(ValidationErrors(errorsList));

    const { name, email, password, phoneNo, role } = req.body;

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ error: "Email is already registered. Please Login" });

    user = await User.findOne({ phoneNo });
    if (user)
      return res
        .status(400)
        .json({ error: "Phone is already registered. Please Login" });

    user = new User({
      name,
      email,
      password,
      phoneNo,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        msg: "User Created",
      },
    });
  } catch (error) {
    next(error);
  }
};

const GetUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: "basic" }, { password: 0 }).lean();
    
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const GetUsers = async (req, res, next) => {
  try {
    let { limit, page, sortBy } = req.query;
    limit = limit ? parseInt(limit) : 1000;
    page = page ? parseInt(page) : 1;
    page = (page - 1) * limit;
    sortBy = sortBy ? sortBy : '-createdAt _id';
    const users = await User.find({ role: "basic" }, { name: 1, email: 1 }).sort(sortBy).limit(limit).skip(page).lean();
    const total_count = await User.countDocuments({ role: "basic" }).exec()
    res.status(200).json({
      success: true,
      users,
      total_count
    });
  } catch (error) {
    next(error);
  }
};

const UpdateUser = async (req, res, next) => {
  try {
    const { name, email, phoneNo, address } = req.body
    const user = await User.findOne({ _id: {$ne: req.params.id} , email }, { email: 1 }).lean();
    if (user){
      res.status(400).json({
        success: false,
        message: "Provided email belongs to another user",
      });
    }

     user = await User.findOneAndUpdate({ _id: req.params.id, role: "basic" }, { 
       $set: { name, email, phoneNo, address }
     })

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id, role: "basic" },{ new:true })
    if(user)
      res.status(200).json({
        success: true,
        message:"User deleted successfully",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateUser,
  GetUser,
  GetUsers,
  UpdateUser,
  DeleteUser
};
