//'use strict';

var mongoose = require('mongoose');

User = mongoose.model('User', require('./user').userSchema);
Action = mongoose.model('Action', require('./action').actionSchema);
Space = mongoose.model('Space', require('./space').spaceSchema);
Artifact = mongoose.model('Artifact', require('./artifact').artifactSchema);
Team = mongoose.model('Team', require('./team').teamSchema);
Message = mongoose.model('Message', require('./message').messageSchema);
Membership = mongoose.model('Membership', require('./membership').membershipSchema);
Domain = mongoose.model('Domain', require('./domain').domainSchema);
