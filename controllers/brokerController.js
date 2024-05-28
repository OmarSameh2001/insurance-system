const Broker = require('../models/broker');

exports.createBroker = async (req, res) => {
  try {
    const broker = new Broker(req.body);
    await broker.save();
    res.status(201).send(broker);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getBrokers = async (req, res) => {
  try {
    const brokers = await Broker.find().populate('policies');
    res.status(200).send(brokers);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBroker = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id).populate('policies');
    if (!broker) {
      return res.status(404).send();
    }
    res.send(broker);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBroker = async (req, res) => {
  try {
    const broker = await Broker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!broker) {
      return res.status(404).send();
    }
    res.send(broker);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteBroker = async (req, res) => {
  try {
    const broker = await Broker.findByIdAndDelete(req.params.id);
    if (!broker) {
      return res.status(404).send();
    }
    res.send(broker);
  } catch (error) {
    res.status(500).send(error);
  }
};
