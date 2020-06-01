const { internalServicesSecret, secretsToken } = require('../config')
const { callInternalService, SERVICES } = require('./internal-service')

function callSecretsService (url, tenant, key, value) {
  return callInternalService(SERVICES.secrets, {
    headers: { internal_secret: internalServicesSecret, tenant },
    method: 'POST',
    data: {
      key,
      value,
      token: secretsToken
    },
    url
  })
    .then(axiosRes => axiosRes.data)
}

function getSecret (tenant, key) {
  return callSecretsService('/api/secrets/get', tenant, key)
}

function setSecret (tenant, key, value) {
  return callSecretsService('/api/secrets/set', tenant, key, value)
}

module.exports = { getSecret, setSecret }
