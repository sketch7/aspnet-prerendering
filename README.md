[projectUri]: https://github.com/sketch7/aspnet-prerendering
[changeLog]: ./CHANGELOG.md
[developmentWorkflowWiki]: ./docs/DEVELOPMENT-WORKFLOW.md
[apiWiki]: ./docs/API.md

[npm]: https://www.npmjs.com/package/@ssv/aspnet-prerendering

# @ssv/aspnet-prerendering
[![CI](https://github.com/sketch7/aspnet-prerendering/actions/workflows/ci.yml/badge.svg)](https://github.com/sketch7/aspnet-prerendering/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40ssv%2Faspnet-prerendering.svg)](https://badge.fury.io/js/%40ssv%2Faspnet-prerendering)

Port of [aspnet-prerendering](https://github.com/aspnet/JavaScriptServices/blob/master/src/Microsoft.AspNetCore.SpaServices/npm/aspnet-prerendering/package.json) which supports ESM.

This allows using vite/esbuild angular (was tested only with angular - `@angular-devkit/build-angular:application`)


**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri]

## Installation

Get library via [npm]

```bash
npm install @ssv/aspnet-prerendering
```


## Usage

```ts
import "zone.js/node";
import "reflect-metadata";
import { renderModule } from "@angular/platform-server";
import { APP_BASE_HREF } from "@angular/common";
import { enableProdMode } from "@angular/core";
// import { createServerRenderer } from "aspnet-prerendering";
import { createServerRenderer } from "@ssv/aspnet-prerendering";

import { AppServerModule } from "./app/app.server.module";

enableProdMode();

interface TransferData {
  originalHtml: string;
  startupContext: StartupContext; // custom
  request: any;
}

export default createServerRenderer(params => {
  const { startupContext, originalHtml } = params.data as TransferData;
  const extraProviders = [
    { provide: APP_BASE_HREF, useValue: startupContext.virtualPath },
    { provide: "BASE_URL", useValue: params.origin + params.baseUrl },
  ];

  const options = {
    document: originalHtml,
    url: params.url,
    extraProviders
  };

  const renderPromise = renderModule(AppServerModule, options);

  return renderPromise.then(html => ({ html }));
});
```


### Contributions

Check out the [development guide][developmentWorkflowWiki].
