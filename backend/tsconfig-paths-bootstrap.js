const tsConfig = require('./tsconfig.json')
const tsConfigPaths = require("tsconfig-paths")

const baseUrl = './'
const cleanUp = tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths
})

cleanUp()