export default function getStaticIndexHtml({js, css}) {
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="./${css}">
    </head>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="./${js}"></script>
    </body>
</html>
`
}
