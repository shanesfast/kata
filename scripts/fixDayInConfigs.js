const path = require("path");
const config = require("../ligma.config");

const src_path = path.join(__dirname, "..", "src");

let day = 9;
const day_name = `day${day}`;
const day_path = path.join(src_path, day_name);
const relative_day_path = path.relative(process.cwd(), day_path);

const align = require("./align-configs");
align.jest(day_name);
align.ts_config(day_name);
align.package_json(config, relative_day_path);
align.stats(config, day_path);
