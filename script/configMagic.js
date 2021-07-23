const { readFileSync, writeFileSync } = require('fs')

let config = readFileSync("./_config.yml");

String.prototype.replaceBetween = function (start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};

const exec = require("child_process").exec;
function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout);
  });
}

const repoKeyIndex = config.indexOf("repo:");
if (repoKeyIndex !== -1) {
  const newLine = config.indexOf("\n", repoKeyIndex);

  execute("git config --get remote.origin.url", (url) => {
    config.replaceBetween(
      repoKeyIndex,
      newLine,
      url.replace("https://github.com/", "") + "\n"
    );
    writeFileSync("./_config.yml", config);
  });
}
