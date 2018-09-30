// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function (app) {
    var Role = app.models.Role;

    Role.registerResolver('verifiedMember', function (role, context, cb) {
        function reject() {
            process.nextTick(function () {
                cb(null, false);
            });
        }
        // if the target model is not project
        if (context.modelName !== 'Member')
            return reject();
        // do not allow anonymous users
        var userId = context.accessToken.userId;
        if (!userId) {
            return reject();
        }

        // check if Member is verified
        var Member = app.models.Member;
        Member.findById(userId, function (err, member) {
            if (err || !member)
                return reject();
            if (!member.emailVerified) {
                return cb(null, false);
            } else {
                cb(null, true); // true = is a verified member
            }
        });
    });

    Role.registerResolver('canBeGroupAdmin', function (role, context, cb) {
        function reject() {
            process.nextTick(function () {
                cb(null, false);
            });
        }
        // if the target model is not project
        if (context.modelName !== 'Member')
            return reject();
        // do not allow anonymous users
        var userId = context.accessToken.userId;
        if (!userId) {
            return reject();
        }

        // check if Member is verified
        var Member = app.models.Member;
        Member.findById(userId, function (err, member) {
            if (err || !member)
                return reject();
            if (!member.isGroupAdmin || !member.emailVerified) {
                return cb(null, false);
            } else {
                cb(null, true); // true = is a verified member with groupadmin rights
            }
        });
    });

    Role.registerResolver('groupMember', function (role, context, cb) {
        function reject() {
            process.nextTick(function () {
                cb(null, false);
            });
        }
        // if the target model is not project
        if (context.modelName !== 'Group') {
            return reject();
        }
        // do not allow anonymous users
        var userId = context.accessToken.userId;
        if (!userId) {
            return reject();
        }

        // check if userId is in Group table for the given Group id
        context.model.findById(context.modelId, function (err, group) {
            if (err || !group)
                return reject();

            var Group = app.models.Group;
            Group.count({
                ownerId: group.ownerId,
                memberId: userId
            }, function (err, count) {
                if (err) {
                    console.log(err);
                    return cb(null, false);
                }
                cb(null, count > 0); // true = is a Group member
            });
        });
    });
};
