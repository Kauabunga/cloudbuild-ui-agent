const fetch = require("node-fetch");
const url = process.env.WEBHOOK_URL;

module.exports.ciCloudbuildUiAgent = async (pubSubEvent, context) => {
  try {
    const build = eventToBuild(pubSubEvent.data);

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(build),
    });
  } catch (err) {
    console.error("CloudbuildUiAgent Error Build", build);
  }
};

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
  return JSON.parse(Buffer.from(data, "base64").toString());
};
