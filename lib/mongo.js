"use strict";
const mongoose = require('mongoose');
const glob = require('glob');
const config = require('../config');

mongoose.connect(config.mongoose.uri);

glob.sync('../models/**.js', {cwd: __dirname}).forEach(require);
