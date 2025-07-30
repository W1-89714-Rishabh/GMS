"use strict";
exports.id = 162;
exports.ids = [162];
exports.modules = {

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