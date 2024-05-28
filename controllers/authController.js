const User = require('../models/user');
const Broker = require('../models/broker')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'secret';

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ _id: user._id }, jwtSecret);
    res.status(201).send({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).send({ error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ _id: user._id }, 'secret');
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.brokerLogin = async (req,res) => {
  try {
    const { email, phone, password} = req.body;
    if(!email && !phone){
      res.status(400).send({error: 'email or number is missing'})
    }
    let isMatch = false
    let broker = null
    broker = await Broker.findOne({phone})
    if(!broker && email) {
      broker = await Broker.findOne({email})
    }
    if(!broker) {
      throw new Error();
    }
    isMatch = await bcrypt.compare(password, broker.password)
    if (!isMatch) {
      return res.status(400).send({ error: 'email or phone or password is wrong' });
    }
    const token = jwt.sign({ _id: broker._id }, 'secret');
    res.send({ broker, token });
  } catch (error) {
    res.status(404).send({error: 'email or phone or password is wrong'});
  }
}
exports.brokerLogin = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!email && !phone) {
      return res
        .status(400)
        .send({ error: "Email or phone number is required" });
    }
    let broker = null;
    if (phone) {
      broker = await Broker.findOne({ phone });
    }
    if (!broker && email) {
      broker = await Broker.findOne({ email });
    }
    if (!broker) {
      return res
        .status(404)
        .send({ error: "Incorrect email, phone number, or password" });
    }
    const isMatch = await bcrypt.compare(password, broker.password);
    if (!isMatch) {
      return res
        .status(404)
        .send({ error: "Incorrect email, phone number, or password" });
    }
    const token = jwt.sign({ _id: broker._id }, "secret");
    res.send({ broker, token });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};