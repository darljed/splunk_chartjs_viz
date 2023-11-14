/*
 * Visualization source
 */
define([
            'jquery',
            '/static/app/splunk_chartjs_viz/node_modules/chart.js/dist/chart.min.js',
            'api/SplunkVisualizationBase',
            'api/SplunkVisualizationUtils',
            // Add required assets to this list
        ],
        function(
            $,
            Chart,
            SplunkVisualizationBase,
            vizUtils
        ) {
  
    // Extend from SplunkVisualizationBase
    return SplunkVisualizationBase.extend({
  
        initialize: function() {
            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
            this.$el = $(this.el);
            console.log(this.el)

            this.id="chartjs-line"+Math.floor((Math.random() * 1000) + 1);
            this.$el.append(`<canvas id="${this.id}"></canvas>`);
            delete this.myData
            console.log("initial load:",this)
            
            // Initialization logic goes here

            this.colors = [
                "#494AE2", "#E24A49", "#49E2E0", "#E2C949", "#7BE249", 
                "#AD49E2", "#E249C3", "#49B3E2", "#E27449", "#49E27B",
                "#E2A749", "#4970E2", "#E249A4", "#49E2B5", "#E2D349",
                "#4977E2", "#E2496D", "#49E2D8", "#E29949", "#4971E2",
                "#E24956", "#49E2A0", "#E2B849", "#4963E2", "#E2A049",
                "#49E28D", "#E24981", "#497CE2", "#E2D049", "#49A9E2",
                "#E249B8", "#4982E2", "#E2AA49", "#4978E2", "#E24997",
                "#498DE2", "#E2CC49", "#4967E2", "#E2496F", "#49C5E2",
                "#E28349", "#4955E2", "#E2A349", "#498BE2", "#E249E0",
                "#49E2AD", "#E249B1", "#4964E2", "#E2C849", "#4975E2",
                "#E2497F", "#49A0E2", "#E2A349", "#4962E2", "#E24956",
                "#49E2B3", "#E2A049", "#497BE2", "#E249A4", "#4963E2",
                "#E2BA49", "#49A8E2", "#E249CC", "#4979E2", "#E2496D",
                "#49D8E2", "#E24985", "#4968E2", "#E2D649", "#4968E2",
                "#E249B5", "#4979E2", "#E2CC49", "#4978E2", "#E249A9",
                "#496BE2", "#E2495C", "#49C2E2", "#E2C849", "#4969E2",
                "#E249A1", "#4975E2", "#E2A949", "#497FE2", "#E249B2",
                "#4964E2", "#E2D449", "#497CE2", "#E24978", "#496AE2",
                "#E249D6", "#496AE2", "#E2CC49", "#497AE2", "#E24965",
                "#4969E2", "#E2A849", "#4964E2", "#E249D3", "#497DE2",
                "#E2C149", "#4978E2", "#E2B249", "#4976E2", "#E249C1"
              ];

              this.rgbMap = {
                "#494AE2": [73, 74, 226],
                "#E24A49": [226, 74, 73],
                "#49E2E0": [73, 226, 224],
                "#E2C949": [226, 201, 73],
                "#7BE249": [123, 226, 73],
                "#AD49E2": [173, 73, 226],
                "#E249C3": [226, 73, 195],
                "#49B3E2": [73, 179, 226],
                "#E27449": [226, 116, 73],
                "#49E27B": [73, 226, 123],
                "#E2A749": [226, 167, 73],
                "#4970E2": [73, 112, 226],
                "#E249A4": [226, 73, 164],
                "#49E2B5": [73, 226, 181],
                "#E2D349": [226, 211, 73],
                "#4977E2": [73, 119, 226],
                "#E2496D": [226, 73, 109],
                "#49E2D8": [73, 226, 216],
                "#E29949": [226, 153, 73],
                "#4971E2": [73, 113, 226],
                "#E24956": [226, 73, 86],
                "#49E2A0": [73, 226, 160],
                "#E2B849": [226, 184, 73],
                "#4963E2": [73, 99, 226],
                "#E2A049": [226, 160, 73],
                "#49E28D": [73, 226, 141],
                "#E24981": [226, 73, 129],
                "#497CE2": [73, 124, 226],
                "#E2D049": [226, 208, 73],
                "#49A9E2": [73, 169, 226],
                "#E249B8": [226, 73, 184],
                "#4982E2": [73, 130, 226],
                "#E2AA49": [226, 170, 73],
                "#4978E2": [73, 120, 226],
                "#E24997": [226, 73, 151],
                "#498DE2": [73, 141, 226],
                "#E2CC49": [226, 204, 73],
                "#4967E2": [73, 103, 226],
                "#E2496F": [226, 73, 111],
                "#49C5E2": [73, 197, 226],
                "#E28349": [226, 131, 73],
                "#4955E2": [73, 85, 226],
                "#E2A349": [226, 163, 73],
                "#498BE2": [73, 139, 226],
                "#E249E0": [226, 73, 224],
                "#49E2AD": [73, 226, 173],
                "#E249B1": [226, 73, 177],
                "#4964E2": [73, 100, 226],
                "#E2C849": [226, 200, 73],
                "#4975E2": [73, 117, 226],
                "#E2497F": [226, 73, 127],
                "#49A0E2": [73, 160, 226],
                "#E2A349": [226, 163, 73],
                "#4962E2": [73, 98, 226],
                "#E24956": [226, 73, 86],
                "#49E2B3": [73, 226, 179],
                "#E2A049": [226, 160, 73],
                "#497BE2": [73, 123, 226],
                "#E249A4": [226, 73, 164],
                "#4963E2": [73, 99, 226],
                "#E2BA49": [226, 186, 73],
                "#49A8E2": [73, 168, 226],
                "#E249CC": [226, 73, 204],
                "#4979E2": [73, 121, 226],
                "#E2496D": [226, 73, 109],
                "#49D8E2": [73, 216, 226],
                "#E24985": [226, 73, 133],
                "#4968E2": [73, 104, 226],
                "#E2D649": [226, 214, 73],
                "#4968E2": [73, 104, 226],
                "#E249B5": [226, 73, 181],
                "#4979E2": [73, 121, 226],
                "#E2CC49": [226, 204, 73],
                "#4978E2": [73, 120, 226],
                "#E249A9": [226, 73, 169],
                "#496BE2": [73, 107, 226],
                "#E2495C": [226, 73, 92],
                "#49C2E2": [73, 194, 226],
                "#E2C849": [226, 200, 73],
                "#4969E2": [73, 105, 226],
                "#E249A1": [226, 73, 161],
                "#4975E2": [73, 117, 226],
                "#E2A949": [226, 169, 73],
                "#497FE2": [73, 127, 226],
                "#E249B2": [226, 73, 178],
                "#4964E2": [73, 100, 226],
                "#E2D449": [226, 212, 73],
                "#497CE2": [73, 124, 226],
                "#E24978": [226, 73, 120],
                "#496AE2": [73, 106, 226],
                "#E249D6": [226, 73, 214],
                "#496AE2": [73, 106, 226],
                "#E2CC49": [226, 204, 73],
                "#497AE2": [73, 122, 226],
                "#E24965": [226, 73, 101],
                "#4969E2": [73, 105, 226],
                "#E2A849": [226, 168, 73],
                "#4964E2": [73, 100, 226],
                "#E249D3": [226, 73, 211],
                "#497DE2": [73, 125, 226],
                "#E2C149": [226, 193, 73],
                "#4978E2": [73, 120, 226],
                "#E2B249": [226, 178, 73],
                "#4976E2": [73, 118, 226],
                "#E249C1": [226, 73, 193],
            };

            
            this.options = {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Chart.js Floating Bar Chart'
                },
                scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true
                    }
                  }
            }
        },

        // Optionally implement to format data returned from search. 
        // The returned object will be passed to updateView as 'data'
        formatData: function(data) {

            // Format data 
            let labelList = []
            let formattedData = {}

            // set chart title
            this.options.title.text = data.fields[0].name

            let initialLoad = true
            data.rows.forEach(element => {
                const label = element[0]
                labelList.push(label)
                for(var i = 1;i<element.length;i++){
                    const fieldLabel = data.fields[i].name
                    if(initialLoad){
                        formattedData[fieldLabel] = []
                    }

                    formattedData[fieldLabel].push(element[i])
                }
                initialLoad = false
            });
            console.log(data)
            console.log("labelList",labelList)
            console.log("formattedData",formattedData)

            // create datasets 
            let dataset = []
            let counter = 0

            for (const key in formattedData) {
                

                // console.log(`${key}: ${user[key]}`);
                dataset.push({
                    label: key,
                    data: formattedData[key],
                    borderColor: this.colors[counter],
                    backgroundColor: this.colors[counter],
                    fill: true,
                    borderRadius: 9
                })
                counter ++
            }

            return {
                labels: labelList,
                datasets: dataset
            };
        },
  
        // Implement updateView to render a visualization.
        //  'data' will be the data object returned from formatData or from the search
        //  'config' will be the configuration property object
        updateView: function(data, config) {
            console.log("checking if the canvas element exists",$(`#${this.id}`))
            // Draw something here
            const ctx = document.getElementById(this.id).getContext("2d")

            this.NewChart = new Chart(
                ctx,{
                    type: 'bar',
                    data: data,
                    options: this.options,
                    }
            );

        },

        // Search data params
        getInitialDataParams: function() {
            return ({
                outputMode: SplunkVisualizationBase.ROW_MAJOR_OUTPUT_MODE,
                count: 0
            });
        },

        // Override to respond to re-sizing events
        reflow: function() {}
    });
});