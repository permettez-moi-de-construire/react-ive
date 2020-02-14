module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": true,
        "browsers": [
          "ie >= 10"
        ]
      }
    }],
    ["@babel/preset-react"]
  ]
}
