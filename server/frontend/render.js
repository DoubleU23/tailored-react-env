import React 				from 'react';
import ReactDOMServer	from 'react-dom/server';

import Html 	from './Html.react';

export default function render(req, res, next) {

	res.send(renderPage());

}

function renderPage() {
	return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
		<html>
			<head>
			</head>
			<body>
				<div id="app"></div>
				<script type="text/javascript" src="http://localhost:80/htdocs/projects/ChatNorris-v2/build/js/main.js"></script>
			</body>
		</html>
	);
}

// function renderPage() {
// 	return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
// 		<Html
// 			appCssFilename={appCssFilename}
// 			bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
// 			googleAnalyticsId={config.googleAnalyticsId}
// 			helmet={Helmet.rewind()}
// 			isProduction={config.isProduction}
// 		/>
// 	);
// }