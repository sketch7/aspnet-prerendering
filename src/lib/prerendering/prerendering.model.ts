export interface RenderToStringFn {
	(
		applicationBasePath: string,
		bootModule: BootModuleInfo,
		absoluteRequestUrl: string,
		requestPathAndQuery: string,
		customDataParameter: object,
		overrideTimeoutMilliseconds: number,
		requestPathBase: string
	): Promise<RenderResult>;
}

export interface RenderToStringResult {
	html: string;
	statusCode?: number;
	globals?: { [key: string]: unknown };
}

export interface RedirectResult {
	redirectUrl: string;
}

export type RenderResult = RenderToStringResult | RedirectResult;

export interface BootFn {
	(params: BootFnParams): Promise<RenderResult>;
}

export interface BootFnParams {
	/** e.g., Location object containing information '/some/path' */
	location: unknown;
	/** e.g., 'https://example.com:1234' */
	origin: string;
	/**  // e.g. '/some/path' */
	url: string;
	/**  e.g. '' or '/myVirtualDir' */
	baseUrl: string;
	/** e.g. 'https://example.com:1234/some/path' */
	absoluteUrl: string;
	domainTasks: Promise<unknown>;
	/** any custom object passed through from .NET */
	data: unknown;
}

export interface BootModuleInfo {
	moduleName: string;
	exportName?: string;
	webpackConfig?: string;
}
