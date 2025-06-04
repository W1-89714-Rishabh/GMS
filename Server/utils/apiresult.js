function apiResult(status, data, message) {
    return { status, data, message }
}

function apiSuccess(data) {
    return { status: "success", data: data }
}

function apiError(msg) {
    return { status: "error", message: msg }
}

module.exports = {
    apiResult,
    apiSuccess,
    apiError
}
