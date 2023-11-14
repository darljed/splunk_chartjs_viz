var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: 'visualization_source',
    resolve: {
        root: [
            path.join(__dirname, 'src'),
        ]
    },
    output: {
        filename: 'visualization.js',
        libraryTarget: 'amd'
    },
    externals: [
        'api/SplunkVisualizationBase',
        'api/SplunkVisualizationUtils',
        // 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.0/chart.min.js'
        '/static/app/splunk_chartjs_viz/node_modules/chart.js/dist/chart.min.js'
    ]
};