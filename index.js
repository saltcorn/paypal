const Workflow = require("@saltcorn/data/models/workflow");
const Form = require("@saltcorn/data/models/form");
const Table = require("@saltcorn/data/models/table");
const View = require("@saltcorn/data/models/view");
const User = require("@saltcorn/data/models/user");
const {
  eval_expression,
  add_free_variables_to_joinfields,
  freeVariables,
} = require("@saltcorn/data/models/expression");
const { getState, features } = require("@saltcorn/data/db/state");

const axios = require("axios");
const { createHash, createHmac } = require("crypto");
const paypal = require("paypal-rest-sdk");

const onLoad = async (cfg) => {
  if (cfg && cfg.client_id)
    paypal.configure({
      mode: (cfg.mode || "sandbox").toLowerCase(),
      client_id: cfg.client_id,
      client_secret: cfg.client_secret,
    });
};

const configuration_workflow = () => {
  const cfg_base_url = getState().getConfig("base_url");

  return new Workflow({
    steps: [
      {
        name: "Paypal configuration",
        form: () =>
          new Form({
            labelCols: 3,
            blurb: !cfg_base_url
              ? "You should set the 'Base URL' configration property. "
              : "",
            fields: [
              {
                name: "mode",
                label: "Mode",
                type: "String",
                required: true,
                attributes: { options: ["Sandbox", "Live"] },
              },
              {
                name: "client_id",
                label: "Client ID",
                type: "String",
                required: true,
              },
              {
                name: "client_secret",
                label: "Client secret",
                type: "String",
                required: true,
              },
            ],
          }),
      },
    ],
  });
};

module.exports = {
  sc_plugin_api_version: 1,
  configuration_workflow,
  onLoad,
  // actions,
  // viewtemplates,
};
