const fs = require("fs");
const getAllPackages = require("./common");

const props = ["name", "description", "website", "defaultChannel", "type", "logo"];

const index = {
    metadata: {
        name: "Mirai Repo Index",
        timestamp: Date.now(),
        commit: require('child_process')
            .execSync('git rev-parse HEAD')
            .toString().trim(),
    }
};

getAllPackages((coord, pkg) => {
    const pkgIndex = JSON.parse(fs.readFileSync(pkg).toString());
    for (let prop of props) {
        if (pkgIndex[prop]) {
            if (!index[coord]) {
                index[coord] = {};
            }
            index[coord][prop] = pkgIndex[prop];
        }
    }
});

fs.writeFileSync("packages.json", JSON.stringify(index));
