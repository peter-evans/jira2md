const { inspect } = require("util");
const core = require("@actions/core");
const j2m = require("jira2md");

async function run() {
  try {
    const inputs = {
      inputText: core.getInput("input-text"),
      mode: core.getInput("mode"),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    switch (inputs.mode) {
      case "jira2md": {
        const md = j2m.to_markdown(inputs.inputText);
        core.setOutput("output-text", md);
        break;
      }
      case "md2jira": {
        const jira = j2m.to_jira(inputs.inputText);
        core.setOutput("output-text", jira);
        break;
      }
      case "md2html": {
        const html = j2m.md_to_html(inputs.inputText);
        core.setOutput("output-text", html);
        break;
      }
      case "jira2html": {
        const html = j2m.jira_to_html(inputs.inputText);
        core.setOutput("output-text", html);
        break;
      }
      default:
        core.setFailed(`Unknown mode: ${inputs.mode}`);
    }
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
  }
}

run();
