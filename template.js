export default ({markup, css}) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Project Skeleton</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100;300;400">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <style>
            a {
                text-decoration: none;
            }
        </style>
    </head>
    <body style="margin: 0">
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
        <script type="text/javascript" src="dist/bundle.js"></script>
    </body>
    </html>
    `
}
