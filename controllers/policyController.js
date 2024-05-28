const Policy = require('../models/Policy');
const User = require('../models/user');
const Broker = require('../models/broker');


exports.createPolicy = async (req, res) => {
  try {
    const policy = new Policy(req.body);
    await policy.save();

    // Atomically push the policy ID into the user and broker arrays
    await Promise.all([
      User.findOneAndUpdate({ _id: policy.user }, { $push: { policies: policy._id } }),
      Broker.findOneAndUpdate({ _id: policy.broker }, { $push: { policies: policy._id, users: policy.user } })
    ]);

    res.status(201).send(policy);
  } catch (error) {
    res.status(400).send(error);
  }
};



exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find().populate('broker').populate('user');
    res.status(200).send(policies);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id).populate('broker').populate('user');
    if (!policy) {
      return res.status(404).send();
    }
    res.send(policy);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!policy) {
      return res.status(404).send();
    }
    res.send(policy);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findByIdAndDelete(req.params.id);
    if (!policy) {
      return res.status(404).send();
    }
    res.send(policy);
  } catch (error) {
    res.status(500).send(error);
  }
};
