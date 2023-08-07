const buildConf = require("./../../build.config");
const gitEnv = process.env.VUE_APP_WEB_TYPE_NODE || "develop";
console.log(buildConf[gitEnv].GlobalPelsTheme);
const GlobalPelsTheme = buildConf[gitEnv].GlobalPelsTheme || "red";
require(`@/style/theme_${GlobalPelsTheme}/index.css`);
