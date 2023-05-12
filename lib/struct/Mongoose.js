const mongoose = require('mongoose');
const Base = require("../utils/Base")

class Mongoose extends Base {
  constructor(options = {}) {
    super()
    this.options = options
    this.db = mongoose
    this.connected = false;


    this.db.connection.on('connected', () => {
      this.log.success('Connected to MongoDB!')
      this.models.forEach(e => {
        this.add(e)
      })
      this.connected = true
    });
    this.db.connection.on('disconnect', () => this.connected = false);

    if (options.autoLoad) {
      this.init()
    }
  }

  init() {
    if (!this.options.enable) return;

    this.db.set('strictQuery', true)
    this.db.connect(this.uri, this.settings)
    .catch((error) => {
      this.log.warn(error.message);
    });

    this.db.Promise = global.Promise;
    return this.db;
  };

  add(model) {
    let module

    try {
      module = require(`${process.cwd()}/${this.modelDir}/${model}.js`)
    } catch(e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        this.log.typer(`Model ${model} not found.`)
      }
    }

    if (this[name]) {
      this.log.typer("Model already exists")
    }
    
    this[model] = this.model(model, module)
  }

  remove(name) {
    if (!name || !this[name]) {
      this.log.typer(`${name} model not found`)
    }

    this[name] = null
  }

  get(name) {
    if (!name || !this[name]) {
      this.log.typer(`${name} model not found`)
    }

    return this[name]
  }


  model(name, data = {}) {
    if (typeof data !== "object") {
      this.log.typer("data must be an object.")
    }

    return this.db.model(name, this.db.Schema(data))
  }

  get modelDir() {
    return this.options.modelDir
  }

  get models() {
    return this.options.models
  }

  get uri() {
    return this.options.uri
  }

  get settings() {
    return this.options.config
  }
};

module.exports = Mongoose