"use strict";
exports.id = 733;
exports.ids = [733,162];
exports.modules = {

/***/ 733:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "createAsync": () => (/* binding */ createAsync),
  "logNodeInstallWarning": () => (/* binding */ logNodeInstallWarning)
});

// EXTERNAL MODULE: ../../node_modules/chalk/source/index.js
var source = __webpack_require__(8746);
var source_default = /*#__PURE__*/__webpack_require__.n(source);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ../@expo/json-file/build/JsonFile.js
var JsonFile = __webpack_require__(6282);
var JsonFile_default = /*#__PURE__*/__webpack_require__.n(JsonFile);
// EXTERNAL MODULE: ../../node_modules/prompts/index.js
var prompts = __webpack_require__(1112);
var prompts_default = /*#__PURE__*/__webpack_require__.n(prompts);
// EXTERNAL MODULE: external "stream"
var external_stream_ = __webpack_require__(2781);
// EXTERNAL MODULE: ./node_modules/tar/dist/esm/index.js + 40 modules
var esm = __webpack_require__(8487);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: ../@expo/package-manager/build/index.js
var build = __webpack_require__(7496);
// EXTERNAL MODULE: ../../node_modules/glob/dist/esm/index.js + 14 modules
var dist_esm = __webpack_require__(4976);
// EXTERNAL MODULE: ../../node_modules/ora/index.js
var ora = __webpack_require__(2651);
var ora_default = /*#__PURE__*/__webpack_require__.n(ora);
// EXTERNAL MODULE: ../../node_modules/picomatch/index.js
var picomatch = __webpack_require__(9138);
var picomatch_default = /*#__PURE__*/__webpack_require__.n(picomatch);
;// CONCATENATED MODULE: ./src/createFileTransform.ts


const debug = __webpack_require__(7984)('expo:init:fileTransform');
function sanitizedName(name) {
    return name
        .replace(/[\W_]+/g, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}
// Directories that can be added to the template with an underscore instead of a dot, e.g. `.vscode` and be added with `_vscode`.
const SUPPORTED_DIRECTORIES = ['eas', 'vscode', 'github', 'cursor'];
function applyNameDuringPipe(entry, name) {
    if (name) {
        // Rewrite paths for bare workflow
        entry.path = entry.path
            .replace(/HelloWorld/g, entry.path.includes('android') ? sanitizedName(name.toLowerCase()) : sanitizedName(name))
            .replace(/helloworld/g, sanitizedName(name).toLowerCase());
    }
    return entry;
}
function modifyFileDuringPipe(entry) {
    if (entry.type && /^file$/i.test(entry.type)) {
        if (external_path_default().basename(entry.path) === 'gitignore') {
            // Rename `gitignore` because npm ignores files named `.gitignore` when publishing.
            // See: https://github.com/npm/npm/issues/1862
            entry.path = entry.path.replace(/gitignore$/, '.gitignore');
        }
        // Detect if the file contains one of the supported directories
        // and rename it to the correct format.
        // For example, if the file is `_vscode`, we want to rename it to `.vscode`.
        // Match one instance of the supported directory name, starting with an underscore, and containing slashes on both sides.
        const regex = new RegExp(`(^|/|\\\\)_(${SUPPORTED_DIRECTORIES.join('|')})(/|\\\\|$)`);
        entry.path = entry.path.replace(regex, (match, p1, p2, p3) => `${p1}.${p2}${p3}`);
    }
    return entry;
}
function createEntryResolver(name) {
    return (entry) => {
        applyNameDuringPipe(entry, name);
        modifyFileDuringPipe(entry);
    };
}
function createGlobFilter(globPattern, options) {
    const matcher = picomatch_default()(globPattern, options);
    debug('filter: created for pattern %s (%s)', globPattern);
    return (path) => {
        const included = matcher(path);
        debug('filter: %s - %s', included ? 'include' : 'exclude', path);
        return included;
    };
}

// EXTERNAL MODULE: ./src/log.ts
var log = __webpack_require__(3744);
// EXTERNAL MODULE: ./src/resolvePackageManager.ts
var resolvePackageManager = __webpack_require__(1805);
// EXTERNAL MODULE: ./src/utils/env.ts
var env = __webpack_require__(7943);
// EXTERNAL MODULE: external "node:process"
var external_node_process_ = __webpack_require__(7742);
;// CONCATENATED MODULE: ./src/utils/fetch.ts

/**
 * Wrap fetch in an assertion check to ensure fetch is available.
 * @todo(cedric): drop when supporting a minimum Node version that does not disable `fetch`.
 */
function wrapFetchWithAssert(fetchFunction) {
    return (...args) => {
        if (!fetchFunction) {
            if (external_node_process_.env.NODE_OPTIONS?.includes('--no-experimental-fetch')) {
                throw new Error('NODE_OPTIONS="--no-experimental-fetch" is not supported, Node.js built-in fetch is required to continue.');
            }
            throw new Error('Node.js built-in Fetch is not available. Ensure that the Fetch API, first available in Node.js 18, is enabled.');
        }
        return fetchFunction(...args);
    };
}
/** Export a fetch method that ensures fetch is available */
const fetch = wrapFetchWithAssert(globalThis.fetch);

// EXTERNAL MODULE: ../../node_modules/@expo/spawn-async/build/spawnAsync.js
var spawnAsync = __webpack_require__(5642);
var spawnAsync_default = /*#__PURE__*/__webpack_require__.n(spawnAsync);
// EXTERNAL MODULE: external "os"
var external_os_ = __webpack_require__(2037);
var external_os_default = /*#__PURE__*/__webpack_require__.n(external_os_);
;// CONCATENATED MODULE: ./src/legacyTemplates.ts



const LEGACY_TEMPLATES = [
    {
        title: 'Default',
        value: 'expo-template-default',
        description: 'includes tools recommended for most app developers',
    },
    {
        title: 'Blank',
        value: 'expo-template-blank',
        description: 'a minimal app as clean as an empty canvas',
    },
    {
        title: 'Blank (TypeScript)',
        value: 'expo-template-blank-typescript',
        description: 'blank app with TypeScript enabled',
    },
    {
        title: 'Navigation (TypeScript)',
        value: 'expo-template-tabs',
        description: 'File-based routing with TypeScript enabled',
    },
    {
        title: 'Blank (Bare)',
        value: 'expo-template-bare-minimum',
        description: 'blank app with the native code exposed (expo prebuild)',
    },
];
const ALIASES = LEGACY_TEMPLATES.map(({ value }) => value);
async function promptTemplateAsync() {
    if (env.env.CI) {
        throw new Error('Cannot prompt for template in CI');
    }
    const { answer } = await prompts_default()({
        type: 'select',
        name: 'answer',
        message: 'Choose a template:',
        choices: LEGACY_TEMPLATES,
    });
    if (!answer) {
        console.log();
        console.log((source_default()) `Please specify the template, example: {cyan --template expo-template-blank}`);
        console.log();
        process.exit(1);
    }
    return answer;
}

;// CONCATENATED MODULE: ./src/utils/npm.ts











const npm_debug = __webpack_require__(7984)('expo:init:npm');
// @ts-ignore
const pipeline = (0,external_util_.promisify)(external_stream_.Stream.pipeline);
function getTemporaryCacheFilePath(subdir = 'template-cache') {
    // This is cleared when the device restarts
    return external_path_default().join(external_os_default().tmpdir(), '.create-expo-app', subdir);
}
/** Applies the `@beta` npm tag when `EXPO_BETA` is enabled. */
function applyBetaTag(npmPackageName) {
    let [name, tag] = splitNpmNameAndTag(npmPackageName);
    if (!tag && env.env.EXPO_BETA) {
        npm_debug('Using beta tag for', name);
        tag = 'beta';
    }
    return joinNpmNameAndTag(name, tag);
}
/** Join an NPM package name and tag together, stripping the tag if it's `undefined`. */
function joinNpmNameAndTag(name, tag) {
    return [name, tag].filter(Boolean).join('@');
}
/** Split a package name from its tag. */
function splitNpmNameAndTag(npmPackageName) {
    const components = npmPackageName.split('@').filter(Boolean);
    if (npmPackageName.startsWith('@')) {
        return ['@' + components[0], components[1]];
    }
    return [components[0], components[1]];
}
/**
 * Applies known shortcuts to an NPM package name and tag.
 * - If the name is `blank`, `blank-typescript`, `tabs`, or `bare-minimum`, apply the prefix `expo-template-`.
 * - If a tag is a numeric value like `45`, and the name is a known template, then convert the tag to `sdk-X`.
 *
 * @example `blank@45` => `expo-template-blank@sdk-45`
 */
function getResolvedTemplateName(npmPackageName) {
    let [name, tag = 'latest'] = splitNpmNameAndTag(npmPackageName);
    if (name.startsWith('@')) {
        return joinNpmNameAndTag(name, tag);
    }
    const aliasPrefix = 'expo-template-';
    if (ALIASES.includes(aliasPrefix + name)) {
        name = aliasPrefix + name;
    }
    // Only apply the numeric conversion if the name is a known template.
    if (ALIASES.includes(name)) {
        if (tag?.match(/^\d+$/)) {
            return name + '@sdk-' + tag;
        }
    }
    return joinNpmNameAndTag(name, tag);
}
function applyKnownNpmPackageNameRules(name) {
    // https://github.com/npm/validate-npm-package-name/#naming-rules
    // package name cannot start with '.' or '_'.
    while (/^(\.|_)/.test(name)) {
        name = name.substring(1);
    }
    name = name.toLowerCase().replace(/[^a-zA-Z0-9._\-/@]/g, '');
    return (name
        // .replace(/![a-z0-9-._~]+/g, '')
        // Remove special characters
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') || null);
}
async function extractLocalNpmTarballAsync(tarFilePath, props) {
    const readStream = external_fs_default().createReadStream(tarFilePath);
    await extractNpmTarballAsync(readStream, props);
}
async function extractNpmTarballAsync(stream, props) {
    if (!stream) {
        throw new Error('Missing stream');
    }
    const { cwd, strip, name, fileList = [], filter } = props;
    await external_fs_default().promises.mkdir(cwd, { recursive: true });
    await pipeline(stream, (0,esm/* extract */.Kl)({
        cwd,
        filter,
        onentry: createEntryResolver(name),
        strip: strip ?? 1,
    }, fileList));
}
async function npmPackAsync(packageName, cwd = undefined, ...props) {
    const npm = getNpmBin();
    const cmd = ['pack', packageName, ...props];
    const cmdString = `${npm} ${cmd.join(' ')}`;
    npm_debug('Run:', cmdString, `(cwd: ${cwd ?? process.cwd()})`);
    if (cwd) {
        await external_fs_default().promises.mkdir(cwd, { recursive: true });
    }
    let results;
    try {
        results = (await spawnAsync_default()(npm, [...cmd, '--json'], { cwd })).stdout?.trim();
    }
    catch (error) {
        if (error?.stderr.match(/npm ERR! code E404/)) {
            const pkg = error.stderr.match(/npm ERR! 404\s+'(.*)' is not in this registry\./)?.[1] ?? error.stderr;
            throw new Error(`NPM package not found: ` + pkg);
        }
        throw error;
    }
    if (!results) {
        return null;
    }
    try {
        const json = JSON.parse(results);
        if (Array.isArray(json) && json.every(isNpmPackageInfo)) {
            return json.map(sanitizeNpmPackageFilename);
        }
        else {
            throw new Error(`Invalid response from npm: ${results}`);
        }
    }
    catch (error) {
        throw new Error(`Could not parse JSON returned from "${cmdString}".\n\n${results}\n\nError: ${error.message}`);
    }
}
function getNpmBin() {
    return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}
async function getNpmInfoAsync(moduleId, cwd) {
    const infos = await npmPackAsync(moduleId, cwd, '--dry-run');
    if (infos?.[0]) {
        return infos[0];
    }
    throw new Error(`Could not find npm package "${moduleId}"`);
}
function isNpmPackageInfo(item) {
    return (item &&
        typeof item === 'object' &&
        'id' in item &&
        'filename' in item &&
        'version' in item &&
        'files' in item);
}
/**
 * Adjust the tar filename in npm package info for `npm@<9.0.0`.
 *
 * @see https://github.com/npm/cli/issues/3405
 */
function sanitizeNpmPackageFilename(item) {
    if (item.filename.startsWith('@') && item.name.startsWith('@')) {
        item.filename = item.filename.replace(/^@/, '').replace(/\//, '-');
    }
    return item;
}
async function fileExistsAsync(path) {
    try {
        const stat = await external_fs_default().promises.stat(path);
        return stat.isFile();
    }
    catch {
        return false;
    }
}
async function downloadAndExtractNpmModuleAsync(npmName, props) {
    const cachePath = getTemporaryCacheFilePath();
    npm_debug(`Looking for NPM tarball (id: ${npmName}, cache: ${cachePath})`);
    await external_fs_default().promises.mkdir(cachePath, { recursive: true });
    const info = await getNpmInfoAsync(npmName, cachePath);
    const cacheFilename = external_path_default().join(cachePath, info.filename);
    try {
        // TODO: This cache does not expire.
        const fileExists = await fileExistsAsync(cacheFilename);
        const disableCache = env.env.EXPO_NO_CACHE || props.disableCache;
        if (disableCache || !fileExists) {
            npm_debug(`Downloading tarball for ${npmName} to ${cachePath}...`);
            await npmPackAsync(npmName, cachePath);
        }
    }
    catch (error) {
        log/* Log.error */.Zb.error('Error downloading template package: ' + npmName);
        throw error;
    }
    try {
        await extractLocalNpmTarballAsync(cacheFilename, {
            cwd: props.cwd,
            name: props.name,
        });
    }
    catch (error) {
        log/* Log.error */.Zb.error('Error extracting template package: ' + npmName);
        throw error;
    }
}

;// CONCATENATED MODULE: ./src/utils/github.ts




const github_debug = __webpack_require__(7984)('expo:init:github');
// See: https://github.com/expo/expo/blob/a5a6eecb082b2c7a7fc9956141738231c7df473f/packages/%40expo/cli/src/prebuild/resolveTemplate.ts#L60-L84
async function getGitHubRepoAsync(url) {
    const [, owner, name, t, branch, ...file] = url.pathname.split('/');
    const filePath = file.join('/');
    // Support repos whose entire purpose is to be an example, e.g.
    // https://github.com/:owner/:my-cool-example-repo-name.
    if (t === undefined) {
        const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
        if (!response.ok && response.status === 404) {
            // Private or non-existing repositories
            throw new Error(`GitHub repository not found for url: ${url}`);
        }
        else if (!response.ok) {
            // Unexpected error from GitHub
            throw new Error(`[${response.status}] Failed to fetch GitHub repository information for url: ${url}`);
        }
        const info = (await response.json());
        return { owner, name, branch: info['default_branch'], filePath };
    }
    if (owner && name && branch && t === 'tree') {
        return { owner, name, branch, filePath };
    }
    throw new Error('Malformed GitHub repository response for URL: ' + url.toString());
}
// See: https://github.com/expo/expo/blob/a5a6eecb082b2c7a7fc9956141738231c7df473f/packages/%40expo/cli/src/prebuild/resolveTemplate.ts#L86-L91
async function isValidGitHubRepoAsync(repo) {
    const contentsUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}/contents`;
    const packagePath = `${repo.filePath ? `/${repo.filePath}` : ''}/package.json`;
    const response = await fetch(contentsUrl + packagePath + `?ref=${repo.branch}`);
    return response.ok;
}
// See: https://github.com/expo/expo/blob/a5a6eecb082b2c7a7fc9956141738231c7df473f/packages/%40expo/cli/src/utils/npm.ts#L134-L139
async function extractRemoteGitHubTarballAsync(url, repo, props) {
    const response = await fetch(url);
    if (!response.ok)
        throw new Error(`Unexpected response: ${response.statusText} (${url})`);
    if (!response.body)
        throw new Error(`Unexpected response: no response body (${url})`);
    // Extract the (sub)directory into non-empty path segments
    const directory = repo.filePath.replace(/^\//, '').split('/').filter(Boolean);
    // Remove the (sub)directory paths, and the root folder added by GitHub
    const strip = directory.length + 1;
    // Only extract the relevant (sub)directories, ignoring irrelevant files
    // The filder auto-ignores dotfiles, unless explicitly included
    const filter = createGlobFilter(!directory.length
        ? ['*/**', '*/ios/.xcode.env']
        : [`*/${directory.join('/')}/**`, `*/${directory.join('/')}/ios/.xcode.env`], {
        // Always ignore the `.xcworkspace` folder
        ignore: ['**/ios/*.xcworkspace/**'],
    });
    await extractNpmTarballAsync(
    // @ts-expect-error see https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65542
    external_stream_.Readable.fromWeb(response.body), { ...props, filter, strip });
}
async function downloadAndExtractGitHubRepositoryAsync(repoUrl, props) {
    github_debug('Looking for GitHub repository');
    const info = await getGitHubRepoAsync(repoUrl);
    const isValid = await isValidGitHubRepoAsync(info);
    if (!isValid) {
        throw new Error(`Could not to locate repository for "${repoUrl}", ensure this repository exists`);
    }
    const url = `https://codeload.github.com/${info.owner}/${info.name}/tar.gz/${info.branch}`;
    github_debug('Resolved GitHub repository', info);
    github_debug('Downloading GitHub repository from:', url);
    await extractRemoteGitHubTarballAsync(url, info, props);
}

;// CONCATENATED MODULE: ./src/Template.ts













const Template_debug = __webpack_require__(7984)('expo:init:template');
const isMacOS = process.platform === 'darwin';
// keep this list in sync with the validation helper in WWW: src/utils/experienceParser.ts
const FORBIDDEN_NAMES = [
    'react-native',
    'react',
    'react-dom',
    'react-native-web',
    'expo',
    'expo-router',
];
function Template_isFolderNameForbidden(folderName) {
    return FORBIDDEN_NAMES.includes(folderName);
}
function deepMerge(target, source) {
    if (typeof target !== 'object') {
        return source;
    }
    if (Array.isArray(target) && Array.isArray(source)) {
        return target.concat(source);
    }
    Object.keys(source).forEach((key) => {
        if (typeof source[key] === 'object' && source[key] !== null) {
            target[key] = deepMerge(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    });
    return target;
}
function coerceUrl(urlString) {
    try {
        return new URL(urlString);
    }
    catch (e) {
        if (!/^(https?:\/\/)/.test(urlString)) {
            return new URL(`https://${urlString}`);
        }
        throw e;
    }
}
function resolvePackageModuleId(moduleId) {
    if (
    // Expands github shorthand (owner/repo) to full URLs
    moduleId.includes('/') &&
        !(moduleId.startsWith('@') || // Scoped package
            moduleId.startsWith('.') || // Relative path
            moduleId.startsWith((external_path_default()).sep) || // Absolute path
            // Contains a protocol
            /^[a-z][-a-z0-9\\.\\+]*:/.test(moduleId))) {
        moduleId = `https://github.com/${moduleId}`;
    }
    if (
    // Supports github repository URLs
    /^(https?:\/\/)?github\.com\//.test(moduleId)) {
        try {
            const uri = coerceUrl(moduleId);
            Template_debug('Resolved moduleId to repository path:', moduleId);
            return { type: 'repository', uri };
        }
        catch {
            throw new Error(`Invalid URL: "${moduleId}" provided`);
        }
    }
    if (
    // Supports `file:./path/to/template.tgz`
    moduleId?.startsWith('file:') ||
        // Supports `../path/to/template.tgz`
        moduleId?.startsWith('.') ||
        // Supports `\\path\\to\\template.tgz`
        moduleId?.startsWith((external_path_default()).sep)) {
        if (moduleId?.startsWith('file:')) {
            moduleId = moduleId.substring(5);
        }
        Template_debug(`Resolved moduleId to file path:`, moduleId);
        return { type: 'file', uri: external_path_default().resolve(moduleId) };
    }
    Template_debug(`Resolved moduleId to NPM package:`, moduleId);
    return { type: 'npm', uri: moduleId };
}
/**
 * Extract a template app to a given file path and clean up any properties left over from npm to
 * prepare it for usage.
 */
async function extractAndPrepareTemplateAppAsync(projectRoot, { npmPackage }) {
    const projectName = external_path_default().basename(projectRoot);
    Template_debug(`Extracting template app (pkg: ${npmPackage}, projectName: ${projectName})`);
    const { type, uri } = resolvePackageModuleId(npmPackage || 'expo-template-default');
    if (type === 'repository') {
        await downloadAndExtractGitHubRepositoryAsync(uri, {
            cwd: projectRoot,
            name: projectName,
        });
    }
    else {
        const resolvedUri = type === 'file' ? uri : getResolvedTemplateName(applyBetaTag(uri));
        await downloadAndExtractNpmModuleAsync(resolvedUri, {
            cwd: projectRoot,
            name: projectName,
            disableCache: type === 'file',
        });
    }
    try {
        const files = await getTemplateFilesToRenameAsync({ cwd: projectRoot });
        await renameTemplateAppNameAsync({
            cwd: projectRoot,
            files,
            name: projectName,
        });
    }
    catch (error) {
        log/* Log.error */.Zb.error('Error renaming app name in template');
        throw error;
    }
    await sanitizeTemplateAsync(projectRoot);
    return projectRoot;
}
function escapeXMLCharacters(original) {
    const noAmps = original.replace('&', '&amp;');
    const noLt = noAmps.replace('<', '&lt;');
    const noGt = noLt.replace('>', '&gt;');
    const noApos = noGt.replace('"', '\\"');
    return noApos.replace("'", "\\'");
}
/**
 * # Background
 *
 * `@expo/cli` and `create-expo` extract a template from a tarball (whether from
 * a local npm project or a GitHub repository), but these templates have a
 * static name that needs to be updated to match whatever app name the user
 * specified.
 *
 * By convention, the app name of all templates is "HelloWorld". During
 * extraction, filepaths are transformed via `createEntryResolver()` in
 * `createFileTransform.ts`, but the contents of files are left untouched.
 * Technically, the contents used to be transformed during extraction as well,
 * but due to poor configurability, we've moved to a post-extraction approach.
 *
 * # The new approach: Renaming the app post-extraction
 *
 * In this new approach, we take a list of file patterns, otherwise known as the
 * "rename config" to determine explicitly which files – relative to the root of
 * the template – to perform find-and-replace on, to update the app name.
 *
 * ## The rename config
 *
 * The rename config can be passed directly as a string array to
 * `getTemplateFilesToRenameAsync()`.
 *
 * The file patterns are formatted as glob expressions to be interpreted by
 * [glob](https://github.com/isaacs/node-glob). Comments are supported with
 * the `#` symbol, both in the plain-text file and string array formats.
 * Whitespace is trimmed and whitespace-only lines are ignored.
 *
 * If no rename config has been passed directly to
 * `getTemplateFilesToRenameAsync()` then this default rename config will be
 * used instead.
 */
const defaultRenameConfig = [
    // Common
    '!**/node_modules',
    'app.json',
    // Android
    'android/**/*.gradle',
    'android/app/BUCK',
    'android/app/src/**/*.java',
    'android/app/src/**/*.kt',
    'android/app/src/**/*.xml',
    // iOS
    'ios/Podfile',
    'ios/**/*.xcodeproj/project.pbxproj',
    'ios/**/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme',
    'ios/**/*.xcworkspace/contents.xcworkspacedata',
    // macOS
    'macos/Podfile',
    'macos/**/*.xcodeproj/project.pbxproj',
    'macos/**/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme',
    'macos/**/*.xcworkspace/contents.xcworkspacedata',
];
/**
 * Returns a list of files within a template matched by the resolved rename
 * config.
 *
 * The rename config is resolved in the order of preference:
 * Config provided as function param > defaultRenameConfig
 */
async function getTemplateFilesToRenameAsync({ cwd, 
/**
 * An array of patterns following the rename config format. If omitted, then
 * we fall back to defaultRenameConfig.
 * @see defaultRenameConfig
 */
renameConfig: userConfig, }) {
    let config = userConfig ?? defaultRenameConfig;
    // Strip comments, trim whitespace, and remove empty lines.
    config = config.map((line) => line.split(/(?<!\\)#/, 2)[0].trim()).filter((line) => line !== '');
    return await (0,dist_esm/* glob */.zA)(config, {
        cwd,
        // `true` is consistent with .gitignore. Allows `*.xml` to match .xml files
        // in all subdirs.
        matchBase: true,
        dot: true,
        // Prevent climbing out of the template directory in case a template
        // includes a symlink to an external directory.
        follow: false,
    });
}
async function renameTemplateAppNameAsync({ cwd, name, files, }) {
    Template_debug(`Got files to transform: ${JSON.stringify(files)}`);
    await Promise.all(files.map(async (file) => {
        const absoluteFilePath = external_path_default().resolve(cwd, file);
        let contents;
        try {
            contents = await external_fs_default().promises.readFile(absoluteFilePath, { encoding: 'utf-8' });
        }
        catch (error) {
            throw new Error(`Failed to read template file: "${absoluteFilePath}". Was it removed mid-operation?`, { cause: error });
        }
        Template_debug(`Renaming app name in file: ${absoluteFilePath}`);
        const safeName = ['.xml', '.plist'].includes(external_path_default().extname(file))
            ? escapeXMLCharacters(name)
            : name;
        try {
            const replacement = contents
                .replace(/Hello App Display Name/g, safeName)
                .replace(/HelloWorld/g, sanitizedName(safeName))
                .replace(/helloworld/g, sanitizedName(safeName.toLowerCase()));
            if (replacement === contents) {
                return;
            }
            await external_fs_default().promises.writeFile(absoluteFilePath, replacement);
        }
        catch (error) {
            throw new Error(`Failed to overwrite template file: "${absoluteFilePath}". Was it removed mid-operation?`, { cause: error });
        }
    }));
}
/**
 * Sanitize a template (or example) with expected `package.json` properties and files.
 */
async function sanitizeTemplateAsync(projectRoot) {
    const projectName = external_path_default().basename(projectRoot);
    Template_debug(`Sanitizing template or example app (projectName: ${projectName})`);
    const templatePath = __webpack_require__.ab + "gitignore";
    const ignorePath = external_path_default().join(projectRoot, '.gitignore');
    if (!external_fs_default().existsSync(ignorePath)) {
        await external_fs_default().promises.copyFile(__webpack_require__.ab + "gitignore", ignorePath);
    }
    const defaultConfig = {
        name: projectName,
        slug: projectName,
    };
    const appFile = new (JsonFile_default())(external_path_default().join(projectRoot, 'app.json'), { default: {} });
    const appContent = (await appFile.readAsync());
    const appJson = deepMerge(appContent, 'expo' in appContent ? { expo: defaultConfig } : defaultConfig);
    await appFile.writeAsync(appJson);
    Template_debug(`Created app.json:\n%O`, appJson);
    const packageFile = new (JsonFile_default())(external_path_default().join(projectRoot, 'package.json'));
    const packageJson = await packageFile.readAsync();
    // name and version are required for yarn workspaces (monorepos)
    const inputName = 'name' in appJson ? appJson.name : appJson.expo.name;
    packageJson.name = applyKnownNpmPackageNameRules(inputName) || 'app';
    // These are metadata fields related to the template package, let's remove them from the package.json.
    // A good place to start
    packageJson.version = '1.0.0';
    packageJson.private = true;
    delete packageJson.description;
    delete packageJson.tags;
    delete packageJson.repository;
    // Only strip the license if it's 0BSD, used by our templates. Leave other licenses alone.
    if (packageJson.license === '0BSD') {
        delete packageJson.license;
    }
    await packageFile.writeAsync(packageJson);
}
function validateName(name) {
    if (typeof name !== 'string' || name === '') {
        return 'The project name can not be empty.';
    }
    if (!/^[a-z0-9@.\-_]+$/i.test(name)) {
        return 'The project name can only contain URL-friendly characters.';
    }
    return true;
}
function logProjectReady({ cdPath, packageManager, }) {
    console.log(source_default().bold(`✅ Your project is ready!`));
    console.log();
    // empty string if project was created in current directory
    if (cdPath) {
        console.log(`To run your project, navigate to the directory and run one of the following ${packageManager} commands.`);
        console.log();
        console.log(`- ${source_default().bold('cd ' + cdPath)}`);
    }
    else {
        console.log(`To run your project, run one of the following ${packageManager} commands.`);
        console.log();
    }
    console.log(`- ${source_default().bold((0,resolvePackageManager/* formatRunCommand */.CP)(packageManager, 'android'))}`);
    let macOSComment = '';
    if (!isMacOS) {
        macOSComment =
            ' # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac';
    }
    console.log(`- ${source_default().bold((0,resolvePackageManager/* formatRunCommand */.CP)(packageManager, 'ios'))}${macOSComment}`);
    console.log(`- ${source_default().bold((0,resolvePackageManager/* formatRunCommand */.CP)(packageManager, 'web'))}`);
}
async function installPodsAsync(projectRoot) {
    let step = logNewSection('Installing CocoaPods.');
    if (process.platform !== 'darwin') {
        step.succeed('Skipped installing CocoaPods because operating system is not macOS.');
        return false;
    }
    const packageManager = new build.CocoaPodsPackageManager({
        cwd: external_path_default().join(projectRoot, 'ios'),
        silent: !env.env.EXPO_DEBUG,
    });
    if (!(await packageManager.isCLIInstalledAsync())) {
        try {
            step.text = 'CocoaPods CLI not found in your $PATH, installing it now.';
            step.render();
            await packageManager.installCLIAsync();
            step.succeed('Installed CocoaPods CLI');
            step = logNewSection('Running `pod install` in the `ios` directory.');
        }
        catch (e) {
            step.stopAndPersist({
                symbol: '⚠️ ',
                text: source_default().red('Unable to install the CocoaPods CLI. Continuing with initializing the project, you can install CocoaPods afterwards.'),
            });
            if (e.message) {
                log/* Log.error */.Zb.error(`- ${e.message}`);
            }
            return false;
        }
    }
    try {
        await packageManager.installAsync();
        step.succeed('Installed pods and initialized Xcode workspace.');
        return true;
    }
    catch (e) {
        step.stopAndPersist({
            symbol: '⚠️ ',
            text: source_default().red('Something went wrong running `pod install` in the `ios` directory. Continuing with initializing the project, you can debug this afterwards.'),
        });
        if (e.message) {
            log/* Log.error */.Zb.error(`- ${e.message}`);
        }
        return false;
    }
}
function logNewSection(title) {
    const disabled = env.env.CI || env.env.EXPO_DEBUG;
    const spinner = ora_default()({
        text: source_default().bold(title),
        // Ensure our non-interactive mode emulates CI mode.
        isEnabled: !disabled,
        // In non-interactive mode, send the stream to stdout so it prevents looking like an error.
        stream: disabled ? process.stdout : process.stderr,
    });
    spinner.start();
    return spinner;
}

;// CONCATENATED MODULE: ./src/Examples.ts












const Examples_debug = __webpack_require__(7984)('expo:init:template');
const Examples_pipeline = (0,external_util_.promisify)(external_stream_.Stream.pipeline);
/** List all existing examples directory from https://github.com/expo/examples. */
async function listExamplesAsync() {
    const response = await fetch('https://api.github.com/repos/expo/examples/contents');
    if (!response.ok) {
        throw new Error('Unexpected GitHub API response: https://github.com/expo/examples');
    }
    const data = (await response.json());
    return data.filter((item) => item.type === 'dir' && !item.name.startsWith('.'));
}
/** Fetch the metadata for the examples from https://github.com/expo/examples. This includes aliases and deprecated examples. */
async function fetchMetadataAsync() {
    const response = await fetch(`https://raw.githubusercontent.com/expo/examples/master/meta.json`);
    if (!response.ok) {
        throw new Error(`Unexpected GitHub API response: ${response.status} - ${response.statusText}`);
    }
    return (await response.json());
}
/** Determine if an example exists, using only its name */
async function hasExampleAsync(name) {
    const response = await fetch(`https://api.github.com/repos/expo/examples/contents/${encodeURIComponent(name)}/package.json`);
    // Either ok or 404 responses are expected
    if (response.status === 404 || response.ok) {
        return response.ok;
    }
    throw new Error(`Unexpected GitHub API response: ${response.status} - ${response.statusText}`);
}
async function ensureExampleExists(name) {
    if (!(await hasExampleAsync(name))) {
        throw new Error(`Example "${name}" does not exist, see https://github.com/expo/examples`);
    }
}
/** Ask the user which example to create */
async function promptExamplesAsync() {
    if (env.env.CI) {
        throw new Error('Cannot prompt for examples in CI');
    }
    const examples = await listExamplesAsync();
    const { answer } = await prompts_default()({
        type: 'select',
        name: 'answer',
        message: 'Choose an example:',
        choices: examples.map((example) => ({
            title: example.name,
            value: example.path,
        })),
    });
    if (!answer) {
        console.log();
        console.log((source_default()) `Please specify the example, example: {cyan --example with-router}`);
        console.log();
        process.exit(1);
    }
    return answer;
}
/** Download and move the selected example from https://github.com/expo/examples. */
async function downloadAndExtractExampleAsync(root, name) {
    const projectName = external_path_default().basename(root);
    const response = await fetch('https://codeload.github.com/expo/examples/tar.gz/master');
    if (!response.ok) {
        Examples_debug(`Failed to fetch the examples code, received status "${response.status}"`);
        throw new Error('Failed to fetch the examples code from https://github.com/expo/examples');
    }
    if (!response.body) {
        Examples_debug(`Failed to fetch the examples code, Github responded without content, received status "${response.status}"`);
        throw new Error('Failed to fetch the examples code from https://github.com/expo/examples');
    }
    await Examples_pipeline(
    // @ts-expect-error see https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65542
    external_stream_.Readable.fromWeb(response.body), (0,esm/* extract */.Kl)({
        cwd: root,
        onentry: createEntryResolver(projectName),
        strip: 2,
    }, [`examples-master/${name}`]));
    const files = await getTemplateFilesToRenameAsync({ cwd: root });
    await renameTemplateAppNameAsync({
        cwd: root,
        files,
        name: projectName,
    });
    await sanitizeTemplateAsync(root);
    await sanitizeScriptsAsync(root);
}
function exampleHasNativeCode(root) {
    return [external_path_default().join(root, 'android'), external_path_default().join(root, 'ios')].some((folder) => external_fs_default().existsSync(folder));
}
async function sanitizeScriptsAsync(root) {
    const defaultScripts = exampleHasNativeCode(root)
        ? {
            start: 'expo start --dev-client',
            android: 'expo run:android',
            ios: 'expo run:ios',
            web: 'expo start --web',
        }
        : {
            start: 'expo start',
            android: 'expo start --android',
            ios: 'expo start --ios',
            web: 'expo start --web',
        };
    const packageFile = new (JsonFile_default())(external_path_default().join(root, 'package.json'));
    const packageJson = await packageFile.readAsync();
    const scripts = (packageJson.scripts ?? {});
    packageJson.scripts = { ...defaultScripts, ...scripts };
    await packageFile.writeAsync(packageJson);
}

;// CONCATENATED MODULE: ./src/utils/dir.ts

// Any of these files are allowed to exist in the projectRoot
const tolerableFiles = [
    // System
    '.DS_Store',
    'Thumbs.db',
    // Git
    '.git',
    '.gitattributes',
    '.gitignore',
    // Project
    '.npmignore',
    'LICENSE',
    'docs',
    '.idea',
    // Package manager
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log',
];
function getConflictsForDirectory(projectRoot) {
    return (0,external_fs_.readdirSync)(projectRoot).filter((file) => !(/\.iml$/.test(file) || tolerableFiles.includes(file)));
}

;// CONCATENATED MODULE: ./src/resolveProjectRoot.ts








function assertValidName(folderName) {
    const validation = validateName(folderName);
    if (typeof validation === 'string') {
        log/* Log.exit */.Zb.exit((source_default()) `{red Cannot create an app named {bold "${folderName}"}. ${validation}}`, 1);
    }
    const isFolderNameForbidden = Template_isFolderNameForbidden(folderName);
    if (isFolderNameForbidden) {
        log/* Log.exit */.Zb.exit((source_default()) `{red Cannot create an app named {bold "${folderName}"} because it would conflict with a dependency of the same name.}`, 1);
    }
}
function assertFolderEmpty(projectRoot, folderName) {
    const conflicts = getConflictsForDirectory(projectRoot);
    if (conflicts.length) {
        log/* Log.log */.Zb.log((source_default()) `The directory {cyan ${folderName}} has files that might be overwritten:`);
        log/* Log.log */.Zb.log();
        for (const file of conflicts) {
            log/* Log.log */.Zb.log(`  ${file}`);
        }
        log/* Log.log */.Zb.log();
        log/* Log.exit */.Zb.exit('Try using a new directory name, or moving these files.\n');
    }
}
async function resolveProjectRootAsync(input) {
    let name = input?.trim();
    if (!name) {
        const { answer } = await prompts_default()({
            type: 'text',
            name: 'answer',
            message: 'What is your app named?',
            initial: 'my-app',
            validate: (name) => {
                const validation = validateName(external_path_default().basename(external_path_default().resolve(name)));
                if (typeof validation === 'string') {
                    return 'Invalid project name: ' + validation;
                }
                return true;
            },
        });
        if (typeof answer === 'string') {
            name = answer.trim();
        }
    }
    if (!name) {
        const selfCmd = (0,resolvePackageManager/* formatSelfCommand */.p6)();
        log/* Log.log */.Zb.log();
        log/* Log.log */.Zb.log('Please choose your app name:');
        log/* Log.log */.Zb.log((source_default()) `  {dim $} {cyan ${selfCmd} <name>}`);
        log/* Log.log */.Zb.log();
        log/* Log.log */.Zb.log(`For more info, run:`);
        log/* Log.log */.Zb.log((source_default()) `  {dim $} {cyan ${selfCmd} --help}`);
        log/* Log.log */.Zb.log();
        log/* Log.exit */.Zb.exit('');
    }
    const projectRoot = external_path_default().resolve(name);
    const folderName = external_path_default().basename(projectRoot);
    assertValidName(folderName);
    await external_fs_default().promises.mkdir(projectRoot, { recursive: true });
    assertFolderEmpty(projectRoot, folderName);
    return projectRoot;
}

// EXTERNAL MODULE: ./src/telemetry.ts + 2 modules
var telemetry = __webpack_require__(3162);
;// CONCATENATED MODULE: ./src/utils/git.ts


const git_debug = __webpack_require__(7984)('expo:init:git');
async function initGitRepoAsync(root) {
    // let's see if we're in a git tree
    try {
        await spawnAsync_default()('git', ['rev-parse', '--is-inside-work-tree'], { stdio: 'ignore', cwd: root });
        git_debug(source_default().dim('New project is already inside of a Git repo, skipping git init.'));
        return false;
    }
    catch (e) {
        if (e.errno === 'ENOENT') {
            git_debug(source_default().dim('Unable to initialize Git repo. `git` not in $PATH.'));
            return false;
        }
    }
    const packageJSON = __webpack_require__(9756);
    // not in git tree, so let's init
    try {
        await spawnAsync_default()('git', ['init'], { stdio: 'ignore', cwd: root });
        await spawnAsync_default()('git', ['add', '-A'], { stdio: 'ignore', cwd: root });
        const commitMsg = `Initial commit\n\nGenerated by ${packageJSON.name} ${packageJSON.version}.`;
        await spawnAsync_default()('git', ['commit', '-m', commitMsg], {
            stdio: 'ignore',
            cwd: root,
        });
        git_debug(source_default().dim('Initialized a Git repository.'));
        return true;
    }
    catch (error) {
        git_debug('Error initializing Git repo:', error);
        // no-op -- this is just a convenience and we don't care if it fails
        return false;
    }
}

;// CONCATENATED MODULE: ./src/utils/log.ts


function withSectionLog(action, message) {
    const disabled = env.env.CI || env.env.EXPO_DEBUG;
    const spinner = ora_default()({
        text: message.pending,
        // Ensure our non-interactive mode emulates CI mode.
        isEnabled: !disabled,
        // In non-interactive mode, send the stream to stdout so it prevents looking like an error.
        stream: disabled ? process.stdout : process.stderr,
    });
    spinner.start();
    return action(spinner).then((result) => {
        spinner.succeed(message.success);
        return result;
    }, (error) => {
        spinner.fail(message.error(error));
        throw error;
    });
}

;// CONCATENATED MODULE: ./src/createAsync.ts












const createAsync_debug = __webpack_require__(7984)('expo:init:create');
async function resolveProjectRootArgAsync(inputPath, { yes }) {
    if (!inputPath && yes) {
        const projectRoot = external_path_default().resolve(process.cwd());
        const folderName = external_path_default().basename(projectRoot);
        assertValidName(folderName);
        assertFolderEmpty(projectRoot, folderName);
        return projectRoot;
    }
    else {
        return await resolveProjectRootAsync(inputPath);
    }
}
async function setupDependenciesAsync(projectRoot, props) {
    const shouldInstall = props.install;
    const packageManager = (0,resolvePackageManager/* resolvePackageManager */.RH)();
    // Configure package manager, which is unrelated to installing or not
    await configureNodeDependenciesAsync(projectRoot, packageManager);
    // Install dependencies
    let podsInstalled = false;
    const needsPodsInstalled = await external_fs_default().existsSync(external_path_default().join(projectRoot, 'ios'));
    if (shouldInstall) {
        await installNodeDependenciesAsync(projectRoot, packageManager);
        if (needsPodsInstalled) {
            podsInstalled = await installCocoaPodsAsync(projectRoot);
        }
    }
    const cdPath = getChangeDirectoryPath(projectRoot);
    console.log();
    logProjectReady({ cdPath, packageManager });
    if (!shouldInstall) {
        logNodeInstallWarning(cdPath, packageManager, needsPodsInstalled && !podsInstalled);
    }
}
async function createAsync(inputPath, options) {
    if (options.example && options.template) {
        throw new Error('Cannot use both --example and --template');
    }
    if (options.example) {
        return await createExampleAsync(inputPath, options);
    }
    return await createTemplateAsync(inputPath, options);
}
async function createTemplateAsync(inputPath, props) {
    let resolvedTemplate = null;
    // @ts-ignore: This guards against someone passing --template without a name after it.
    if (props.template === true) {
        resolvedTemplate = await promptTemplateAsync();
    }
    else {
        resolvedTemplate = props.template ?? null;
        console.log((source_default()) `Creating an Expo project using the {cyan ${resolvedTemplate ?? 'default'}} template.\n`);
        if (!resolvedTemplate) {
            console.log((source_default()) `{gray To choose from all available templates ({underline https://github.com/expo/expo/tree/main/templates}) pass in the --template arg:}`);
            console.log((source_default()) `  {gray $} ${(0,resolvePackageManager/* formatSelfCommand */.p6)()} {cyan --template}\n`);
            console.log((source_default()) `{gray To choose from all available examples ({underline https://github.com/expo/examples}) pass in the --example arg:}`);
            console.log((source_default()) `  {gray $} ${(0,resolvePackageManager/* formatSelfCommand */.p6)()} {cyan --example}\n`);
        }
    }
    const projectRoot = await resolveProjectRootArgAsync(inputPath, props);
    await external_fs_default().promises.mkdir(projectRoot, { recursive: true });
    // Setup telemetry attempt after a reasonable point.
    // Telemetry is used to ensure safe feature deprecation since the command is unversioned.
    // All telemetry can be disabled across Expo tooling by using the env var $EXPO_NO_TELEMETRY.
    await (0,telemetry.initializeAnalyticsIdentityAsync)();
    (0,telemetry.identify)();
    (0,telemetry.track)({
        event: telemetry.AnalyticsEventTypes.CREATE_EXPO_APP,
        properties: { phase: telemetry.AnalyticsEventPhases.ATTEMPT, template: resolvedTemplate },
    });
    await withSectionLog(() => extractAndPrepareTemplateAppAsync(projectRoot, { npmPackage: resolvedTemplate }), {
        pending: source_default().bold('Locating project files.'),
        success: 'Downloaded and extracted project files.',
        error: (error) => `Something went wrong in downloading and extracting the project files: ${error.message}`,
    });
    await setupDependenciesAsync(projectRoot, props);
    // for now, we will just init a git repo if they have git installed and the
    // project is not inside an existing git tree, and do it silently. we should
    // at some point check if git is installed and actually bail out if not, because
    // npm install will fail with a confusing error if so.
    try {
        // check if git is installed
        // check if inside git repo
        await initGitRepoAsync(projectRoot);
    }
    catch (error) {
        createAsync_debug(`Error initializing git: %O`, error);
        // todo: check if git is installed, bail out
    }
}
async function createExampleAsync(inputPath, props) {
    let resolvedExample = '';
    if (props.example === true) {
        resolvedExample = await promptExamplesAsync();
    }
    else if (props.example) {
        resolvedExample = props.example;
    }
    // Handle remapping aliases and throwing for deprecated examples. If we are
    // unable to fetch metadata, for any reason, just proceed without it. This protects
    // against a broken metadata endpoint from bringing down the entire command.
    let metadata = null;
    try {
        metadata = await fetchMetadataAsync();
        if (!metadata || !metadata.aliases || !metadata.deprecated) {
            throw new Error('No metadata found.');
        }
    }
    catch (error) {
        createAsync_debug(`Error fetching metadata: %O`, error);
        log/* Log.error */.Zb.error(`Error fetching metadata, proceeding without alias or deprecation data.`);
    }
    if (metadata && metadata.aliases[resolvedExample]) {
        const alias = metadata.aliases[resolvedExample];
        const destination = typeof alias === 'string' ? alias : alias.destination;
        console.log((source_default()) `{gray The {cyan ${resolvedExample}} example has been renamed to {cyan ${destination}}.}`);
        // Optional message to show when an example is aliased, in case additional context is required
        if (typeof alias === 'object' && alias.message) {
            console.log((source_default()) `{gray ${alias.message}}`);
        }
        resolvedExample = destination;
    }
    else if (metadata && metadata.deprecated[resolvedExample]) {
        throw new Error(getDeprecatedExampleErrorMessage(resolvedExample, metadata));
    }
    // Ensure the example exists after performing remapping and deprecation checks.
    await ensureExampleExists(resolvedExample);
    // Log the status after aliases and deprecated examples are handled.
    console.log((source_default()) `Creating an Expo project using the {cyan ${resolvedExample}} example.\n`);
    const projectRoot = await resolveProjectRootArgAsync(inputPath, props);
    await external_fs_default().promises.mkdir(projectRoot, { recursive: true });
    // Setup telemetry attempt after a reasonable point.
    // Telemetry is used to ensure safe feature deprecation since the command is unversioned.
    // All telemetry can be disabled across Expo tooling by using the env var $EXPO_NO_TELEMETRY.
    await (0,telemetry.initializeAnalyticsIdentityAsync)();
    (0,telemetry.identify)();
    (0,telemetry.track)({
        event: telemetry.AnalyticsEventTypes.CREATE_EXPO_APP,
        properties: { phase: telemetry.AnalyticsEventPhases.ATTEMPT, example: resolvedExample },
    });
    await withSectionLog(() => downloadAndExtractExampleAsync(projectRoot, resolvedExample), {
        pending: source_default().bold('Locating example files...'),
        success: 'Downloaded and extracted example files.',
        error: (error) => `Something went wrong in downloading and extracting the example files: ${error.message}`,
    });
    await setupDependenciesAsync(projectRoot, props);
    // for now, we will just init a git repo if they have git installed and the
    // project is not inside an existing git tree, and do it silently. we should
    // at some point check if git is installed and actually bail out if not, because
    // npm install will fail with a confusing error if so.
    try {
        // check if git is installed
        // check if inside git repo
        await initGitRepoAsync(projectRoot);
    }
    catch (error) {
        createAsync_debug(`Error initializing git: %O`, error);
        // todo: check if git is installed, bail out
    }
}
function getChangeDirectoryPath(projectRoot) {
    const cdPath = external_path_default().relative(process.cwd(), projectRoot);
    if (cdPath.length <= projectRoot.length) {
        return cdPath;
    }
    return projectRoot;
}
async function configureNodeDependenciesAsync(projectRoot, packageManager) {
    try {
        await (0,resolvePackageManager/* configurePackageManager */.a1)(projectRoot, packageManager, { silent: false });
    }
    catch (error) {
        createAsync_debug(`Error configuring package manager: %O`, error);
        log/* Log.error */.Zb.error(`Something went wrong configuring the package manager. Check your ${packageManager} logs. Continuing to create the app.`);
        log/* Log.exception */.Zb.exception(error);
    }
}
async function installNodeDependenciesAsync(projectRoot, packageManager) {
    try {
        await (0,resolvePackageManager/* installDependenciesAsync */.a3)(projectRoot, packageManager, { silent: false });
    }
    catch (error) {
        createAsync_debug(`Error installing node modules: %O`, error);
        log/* Log.error */.Zb.error(`Something went wrong installing JavaScript dependencies. Check your ${packageManager} logs. Continuing to create the app.`);
        log/* Log.exception */.Zb.exception(error);
    }
}
async function installCocoaPodsAsync(projectRoot) {
    let podsInstalled = false;
    try {
        podsInstalled = await installPodsAsync(projectRoot);
    }
    catch (error) {
        createAsync_debug(`Error installing CocoaPods: %O`, error);
    }
    return podsInstalled;
}
function logNodeInstallWarning(cdPath, packageManager, needsPods) {
    console.log(`\n⚠️  Before running your app, make sure you have modules installed:\n`);
    console.log(`  cd ${cdPath || '.'}${(external_path_default()).sep}`);
    console.log(`  ${packageManager} install`);
    if (needsPods && process.platform === 'darwin') {
        console.log(`  npx pod-install`);
    }
    console.log();
}
function getDeprecatedExampleErrorMessage(example, metadata) {
    const { message, outdatedExampleHref } = metadata.deprecated[example];
    let output = `${example} is no longer available.`;
    if (message) {
        output += ` ${message}`;
    }
    if (outdatedExampleHref) {
        output += `\n\nYou can also refer to the outdated example code in examples git repository history, if it is useful: ${outdatedExampleHref}`;
    }
    return output;
}


/***/ }),

/***/ 3162:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AnalyticsEventPhases": () => (/* binding */ AnalyticsEventPhases),
  "AnalyticsEventTypes": () => (/* binding */ AnalyticsEventTypes),
  "_resetGlobals": () => (/* binding */ _resetGlobals),
  "flushAsync": () => (/* binding */ flushAsync),
  "identify": () => (/* binding */ identify),
  "initializeAnalyticsIdentityAsync": () => (/* binding */ initializeAnalyticsIdentityAsync),
  "track": () => (/* binding */ track)
});

// EXTERNAL MODULE: ../@expo/json-file/build/JsonFile.js
var JsonFile = __webpack_require__(6282);
var JsonFile_default = /*#__PURE__*/__webpack_require__.n(JsonFile);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_);
// EXTERNAL MODULE: external "os"
var external_os_ = __webpack_require__(2037);
var external_os_default = /*#__PURE__*/__webpack_require__.n(external_os_);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
;// CONCATENATED MODULE: ./src/paths.ts


// The ~/.expo directory is used to store authentication sessions,
// which are shared between EAS CLI and Expo CLI.
function dotExpoHomeDirectory() {
    const home = external_os_default().homedir();
    if (!home) {
        throw new Error("Can't determine your home directory; make sure your $HOME environment variable is set.");
    }
    let dirPath;
    if (process.env.EXPO_STAGING) {
        dirPath = external_path_default().join(home, '.expo-staging');
    }
    else if (process.env.EXPO_LOCAL) {
        dirPath = external_path_default().join(home, '.expo-local');
    }
    else {
        dirPath = external_path_default().join(home, '.expo');
    }
    return dirPath;
}
const getStateJsonPath = () => external_path_default().join(dotExpoHomeDirectory(), 'state.json');

;// CONCATENATED MODULE: ./src/sessionStorage.ts


function getSession() {
    try {
        return JsonFile_default().read(getStateJsonPath())?.auth ?? null;
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return null;
        }
        throw error;
    }
}

// EXTERNAL MODULE: ./src/utils/env.ts
var env = __webpack_require__(7943);
;// CONCATENATED MODULE: ./src/telemetry.ts







const packageJSON = __webpack_require__(4147);
const xdlUnifiedWriteKey = '1wabJGd5IiuF9Q8SGlcI90v8WTs';
const analyticsEndpoint = 'https://cdp.expo.dev/v1/batch';
const version = '1.0.0';
const library = packageJSON.name;
const messageBatch = [];
let analyticsIdentity = null;
// jest does not clear global variables inbetween tests so we need this helper
function _resetGlobals() {
    if (env.env.EXPO_NO_TELEMETRY)
        return;
    analyticsIdentity = null;
    messageBatch.splice(0, messageBatch.length);
}
// call before tracking any analytics events.
// if track/identify are called before this method they will be dropped
async function initializeAnalyticsIdentityAsync() {
    if (env.env.EXPO_NO_TELEMETRY)
        return;
    if (analyticsIdentity) {
        return;
    }
    analyticsIdentity = await getAnalyticsIdentityAsync();
}
function identify() {
    if (env.env.EXPO_NO_TELEMETRY)
        return;
    enqueue('identify', {});
}
function track(message) {
    if (env.env.EXPO_NO_TELEMETRY)
        return;
    enqueue('track', { ...message, context: getAnalyticsContext() });
}
function enqueue(type, message) {
    if (!analyticsIdentity) {
        // do not send messages without identities to our backend
        return;
    }
    message = { ...message, ...analyticsIdentity };
    message.type = type;
    if (message.type === 'identify') {
        message.traits ??= {};
        message.context ??= {};
        message.context.traits = message.traits;
    }
    message.context = {
        library: {
            name: library,
            version,
        },
        ...message.context,
    };
    message._metadata = {
        nodeVersion: process.versions.node,
        ...message._metadata,
    };
    if (!message.originalTimestamp) {
        message.originalTimestamp = new Date();
    }
    if (!message.messageId) {
        // We md5 the messaage to add more randomness. This is primarily meant
        // for use in the browser where the uuid package falls back to Math.random()
        // which is not a great source of randomness.
        // Borrowed from analytics.js (https://github.com/segment-integrations/analytics.js-integration-segmentio/blob/a20d2a2d222aeb3ab2a8c7e72280f1df2618440e/lib/index.js#L255-L256).
        message.messageId = `node-${external_crypto_default().createHash('md5')
            .update(JSON.stringify(message))
            .digest('hex')}-${uuidv4()}`;
    }
    messageBatch.push(message);
}
// very barebones implemention...
// does not support multiple concurrent flushes or large numbers of messages
async function flushAsync() {
    if (env.env.EXPO_NO_TELEMETRY)
        return;
    if (!messageBatch.length) {
        return;
    }
    const request = {
        method: 'POST',
        headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json;charset=utf-8',
            'user-agent': `${library}/${version}`,
            authorization: 'Basic ' + Buffer.from(`${xdlUnifiedWriteKey}:`).toString('base64'),
        },
        body: JSON.stringify({
            batch: messageBatch.map((message) => ({ ...message, sentAt: new Date() })),
            sentAt: new Date(),
        }),
    };
    try {
        // Note(cedric): try to use the global fetch instance, but silently fail if its disabled in Node 18
        await fetch(analyticsEndpoint, request);
    }
    catch {
        // supress errors - likely due to network connectivity or endpoint health
    }
    // clear array so we don't resend events in subsequent flushes
    messageBatch.splice(0, messageBatch.length);
}
//#endregion
//#region copied from eas cli https://github.com/expo/eas-cli/blob/f0c958e58bc7aa90ee8f822e075d40703563708e/packages/eas-cli/src/analytics/rudderstackClient.ts#L9-L13
const PLATFORM_TO_ANALYTICS_PLATFORM = {
    darwin: 'Mac',
    win32: 'Windows',
    linux: 'Linux',
};
function getAnalyticsContext() {
    const platform = PLATFORM_TO_ANALYTICS_PLATFORM[external_os_default().platform()] || external_os_default().platform();
    return {
        os: { name: platform, version: external_os_default().release() },
        device: { type: platform, model: platform },
        app: { name: library, version: packageJSON.version },
    };
}
//#endregion
function uuidv4() {
    try {
        // available on node 14+
        // https://github.com/denoland/deno/issues/12754
        return external_crypto_default().randomUUID();
    }
    catch {
        // supress errors due to node 13 or less not having randomUUID
        return null;
    }
}
var AnalyticsEventTypes;
(function (AnalyticsEventTypes) {
    AnalyticsEventTypes["CREATE_EXPO_APP"] = "create expo app";
})(AnalyticsEventTypes || (AnalyticsEventTypes = {}));
var AnalyticsEventPhases;
(function (AnalyticsEventPhases) {
    AnalyticsEventPhases["ATTEMPT"] = "attempt";
    AnalyticsEventPhases["SUCCESS"] = "success";
    AnalyticsEventPhases["FAIL"] = "fail";
})(AnalyticsEventPhases || (AnalyticsEventPhases = {}));
async function getAnalyticsIdentityAsync() {
    if (!external_fs_default().existsSync(dotExpoHomeDirectory())) {
        external_fs_default().mkdirSync(dotExpoHomeDirectory(), { recursive: true });
    }
    if (!external_fs_default().existsSync(getStateJsonPath())) {
        external_fs_default().writeFileSync(getStateJsonPath(), JSON.stringify({}));
    }
    const savedDeviceId = await JsonFile_default().getAsync(getStateJsonPath(), 'analyticsDeviceId', null);
    const deviceId = savedDeviceId ?? uuidv4();
    if (!deviceId) {
        // unable to generate an id or load one from disk
        return null;
    }
    if (!savedDeviceId) {
        await JsonFile_default().setAsync(getStateJsonPath(), 'analyticsDeviceId', deviceId);
    }
    const userId = getSession()?.userId ?? null;
    return userId ? { anonymousId: deviceId, userId } : { anonymousId: deviceId };
}


/***/ })

};
;