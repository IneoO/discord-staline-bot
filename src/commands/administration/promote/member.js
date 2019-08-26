const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  userIdRole,
  memberIdRole,
} = require('@/config.js');

module.exports = (msg, user) => {
  const author = msg.member;
  const roles = [moderatorIdRole];
  isAuthorized(author, roles).then((err) => {
    if (!err) {
      const userRole = msg.guild.roles.get(userIdRole);
      const memberRole = msg.guild.roles.get(memberIdRole);
      user.addRole(userRole).catch(console.error);
      user.addRole(memberRole).catch(console.error);
      return msg.channel.send(`<@${user.id}> has been promote member.`);
    } else {
      msg.reply('you are not allowed to promote anybody.');
    }
  }).catch((e) => {
    console.error(e);
    msg.reply('Something went wrong');
  });
};