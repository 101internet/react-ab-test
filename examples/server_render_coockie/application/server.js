import React from "react";
import ReactDOMServer from "react-dom/server";
import ServerApp from "./app";
import { AB_Provider, AB_Test, StorageAdapter } from "../../../dist";

const experimentMap = [
  {
    name: "MyExperiment",
    variants: [
      {
        name: "A",
        weight: 3
      },
      {
        name: "B",
        weight: 7
      },
      {
        name: "C",
        weight: 10
      }
    ],
    resolve: variant => {
      console.log("MyExperiment: selected variant", variant);
    }
  }
];

export const App = {
  getHTML: Cookies => {
    const storageAdapter = new StorageAdapter({
      setter: (name, val) => Cookies.set(name, val, { httpOnly: false }),
      getter: name => Cookies.get(name)
    });

    const abTest = new AB_Test(experimentMap, storageAdapter);

    const html = (
      <Html
        content={ReactDOMServer.renderToString(
          <AB_Provider abTest={abTest}>
            <ServerApp />
          </AB_Provider>
        )}
      />
    );

    return {
      html: `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`
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
