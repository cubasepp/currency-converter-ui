const PROXY_CONFIG = [
  {
    context: [
      "/convert"
    ],
    target: "http://localhost:3000",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
