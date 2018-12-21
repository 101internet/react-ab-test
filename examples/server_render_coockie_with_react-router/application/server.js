import React from "react";
import ReactDOMServer from "react-dom/server";
import ServerApp from "./app";
import { StaticRouter } from "react-router";
import { AB_Provider, AB_Test, StorageAdapter } from "../../../dist";
import { createLocation } from "history";

const experimentMap = [
  {
    name: "MyExperiment",
    variants: [
      {
        name: "Default",
        weight: 1
      },
      {
        name: "B",
        weight: 2
      }
    ],
    resolve: variant => {
      console.log("MyExperiment: selected variant", variant);
    }
  },
  {
    name: "MyExperiment2",
    variants: [
      {
        name: "Default",
        weight: 1
      },
      {
        name: "B",
        weight: 2
      }
    ],
    resolve: variant => {
      console.log("MyExperiment2: selected variant", variant);
    }
  }
];

export const App = {
  getHTML: (Cookies, location) => {
    const storageAdapter = new StorageAdapter({
      setter: (name, val) => Cookies.set(name, val, { httpOnly: false }),
      getter: name => Cookies.get(name)
    });

    const abTest = new AB_Test(experimentMap, storageAdapter);
    let AB_context = {};
    const html = (
      <Html
        content={ReactDOMServer.renderToString(
          <StaticRouter location={location} context={{}}>
            <AB_Provider
              location={createLocation(location)}
              abTest={abTest}
              context={AB_context}
            >
              <ServerApp />
            </AB_Provider>
          </StaticRouter>
        )}
      />
    );

    return {
      html: `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`,
      ab_context: AB_context
    };
  }
};

function Html({ content }) {
  return (
    <html>
      <head />
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="/app.js" />
        <script>window.main();</script>
      </body>
    </html>
  );
}
