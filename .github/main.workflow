workflow "Deploy website" {
  on = "release"
  resolves = ["Deploy"]
}

action "Deploy" {
  uses = "docker://node:10"
  runs = [
    "sh",
    "-c",
    "git remote set-url origin https://${DEPLOY_TOKEN}@192.168.1.110:web-support/joy-pro.git && npm install && npm run deploy"
  ],
  secrets = ["DEPLOY_TOKEN"]
}
