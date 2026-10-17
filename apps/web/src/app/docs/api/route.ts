import { ApiReference } from '@scalar/nextjs-api-reference';
import { getOpenApiSpec } from '@/lib/openapi';

const spec = getOpenApiSpec();

export const GET = ApiReference({
	spec: {
		content: spec as any,
	},
	theme: 'default',
	layout: 'modern',
	hideDownloadButton: true,
	metaData: {
		title: 'Roadwise API Reference',
	},
});
