const { type } = require("jquery");

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

            this.id="chartjs-line"+Math.floor((Math.random() * 1000) + 1);
            this.$el.append(`
            <div class="chartjs-line legend-contents" id="${this.id}_legend">
                <ul class="chartjs-legend-list">
                </ul>
            </div>
            <canvas id="${this.id}"></canvas>`);
            this.$el.addClass('chartjs-line')
            // delete this.myData
            // console.log("initial load:",this)
            
            // Initialization logic goes here

            this.colors = [
                "#494AE2", "#1f7c52", "#E24A49", "#49E2E0", "#E2C949", "#7BE249", 
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
                "#1f7c52": [31, 124, 82],
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
                layout:{
                    padding: {
                        top: 30,
                        left: 60,
                        right: 30,
                        bottom: 50
                    }
                },
                scales: {
                  y: {
                        beginAtZero: true,
                        ticks: {
                          // forces step size to be 50 units
                          stepSize: 25 // default
                        },
                        grid: {
                          color: '#ededed',
                          borderColor: '#ededed',
                          tickColor: '#fff',
                          borderDash: [10]
                        },
                        stacked: true
                    },
                  x: {    
                      grid: {
                        color: '#ededed',
                        borderColor: '#ededed',
                        tickColor: '#fff',
                        display: false
                      },
                      stacked: true
                    }
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                      display: false
                      // labels:{
                      //     usePointStyle: true,
                      //     pointStyle: 'box'
                      // }
                  },
                  title: {
                      display: false,
                      text: 'This is a test label',
                  },
                  tooltip: {}
              },
                  interaction:{
                      mode: 'nearest',
                      intersect: false
                  }
              }
        },

        // Optionally implement to format data returned from search. 
        // The returned object will be passed to updateView as 'data'
        formatData: function(data) {

            // Format data 
            let labelList = []
            let formattedData = {}
            // console.log(data)

            let initialLoad = true
            data.rows.forEach(element => {

                
                const label = data.fields[0].name == '_time' ? element[0].split('.')[0].replace('T',' ') : element[0]
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

            // create datasets 
            let dataset = []
            let counter = 0

            for (const key in formattedData) {
                
                if(!key.startsWith("_")){
                    dataset.push({
                        label: key,
                        data: formattedData[key],
                        backgroundColor: this.colors[counter],
                        fill: true,
                        borderSkipped: false,
                        barPercentage: .6
                    })
                }
                counter ++
            }

            return {
                labels: labelList,
                datasets: dataset,
                fields: data.fields
            };
        },
  
        // Implement updateView to render a visualization.
        //  'data' will be the data object returned from formatData or from the search
        //  'config' will be the configuration property object
        updateView: function(data, config) {
            const self = this

            // Draw something here
            const ctx = document.getElementById(this.id).getContext("2d")

            // CAPTURE CUSTOM CONFIG 
            
            // Time Format
            var timeformat = config[this.getPropertyNamespaceInfo().propertyNamespace + 'timeformat'] || 'option1';
            
            // time format 
            // console.log(data,timeformat)
            if(data.fields.length > 0){
                if(data.fields[0].name == "_time"){
                    if(timeformat == 'option2') {// date and time
                        data.labels.forEach((element,index) =>{
                            data.labels[index] = element.split(" ")[0]
                            
                        })
                    }
                }
            }

            // border radius

            var topLeft = config[this.getPropertyNamespaceInfo().propertyNamespace + 'brTopLeft'] || 9;
            var topRight = config[this.getPropertyNamespaceInfo().propertyNamespace + 'brTopRight'] || 9;
            var bottomLeft = config[this.getPropertyNamespaceInfo().propertyNamespace + 'brBottomLeft'] || 0;
            var bottomRight = config[this.getPropertyNamespaceInfo().propertyNamespace + 'brBottomRight'] || 0;
            

            const borderRadius = {
                topLeft: topLeft,
                topRight: topRight,
                bottomLeft: bottomLeft,
                bottomRight: bottomRight,
            }

            var isStacked = config[this.getPropertyNamespaceInfo().propertyNamespace + 'stacked'] || false;
            isStacked = isStacked === 'false' ? false : true
            const datasetCount = data.datasets.length
            data.datasets.forEach((element,index)=>{
                

                if(isStacked){
                    if(index == 0){
                        data.datasets[index]['borderRadius'] = {
                            topLeft: 0,
                            topRight: 0,
                            bottomLeft: bottomLeft,
                            bottomRight: bottomRight,
                        }
                    }
                    else if(index == datasetCount - 1){
                        data.datasets[index]['borderRadius'] = {
                            topLeft: topLeft,
                            topRight: topRight,
                            bottomLeft: 0,
                            bottomRight: 0,
                        }
                    }
                    else{
                        data.datasets[index]['borderRadius'] = {
                            topLeft: 0,
                            topRight: 0,
                            bottomLeft: 0,
                            bottomRight: 0,
                        }
                    }
                    data.datasets[index]['borderWidth'] = 2
                    data.datasets[index]['borderColor'] = `rgb(0,0,0,0)`
                }
                else{
                    data.datasets[index]['borderRadius'] = borderRadius
                }
            })

            // tooltip style selection 
            var tooltip_style = config[this.getPropertyNamespaceInfo().propertyNamespace + 'tooltip_style'] || 'style1';
            // chart customization starts here using custom plugin

            // Colors
            var customColors = config[this.getPropertyNamespaceInfo().propertyNamespace + 'colors'] || null;
            var highlight_effect = config[this.getPropertyNamespaceInfo().propertyNamespace + 'highlight'] || false;
            highlight_effect = highlight_effect === 'false' ? false : true

            // adding custom colors 
            if(customColors != null){
                function hexToRgb(hex) {
                    // Remove the hash if it exists
                    hex = hex.replace(/^#/, '');
                  
                    // Parse the hex value to separate R, G, and B components
                    let bigint = parseInt(hex, 16);
                    let r = (bigint >> 16) & 255;
                    let g = (bigint >> 8) & 255;
                    let b = bigint & 255;
                  
                    // Return the RGB values as an object
                    return [r, g, b];
                }
                const c = customColors.split(",")
                if(typeof(c) == 'object'){
                    c.forEach((element,index)=>{
                        self.colors[index] = element
                        // add rgb conversion
                        self.rgbMap[element] = hexToRgb(element)
                    })
                }
            }


            // set the custom colors to the background
            data.datasets.forEach((element,counter) => {
                element.backgroundColor = this.colors[counter]
            })

            var unit = config[this.getPropertyNamespaceInfo().propertyNamespace + 'unit'] || null;
            unit = unit != null ? (unit.trim() == "" ? null : unit) : unit
            let unitObj = {}
            if(unit != null){
                unit.split(",").forEach(element=>{
                    unitObj[element.split(":")[0]] = { unit: element.split(":")[1] }
                })
            }
            
            // ########## STYLE 1 ############
            // tooltip custom position - 

            Chart.Tooltip.positioners.customPos = function(elements, eventPosition) {
                // /** @type {Chart.Tooltip} */
                // console.log(elements)
                var tooltip = this;
                let pos = {x:eventPosition.x,y:0}
                if(elements.length > 0){
                    const base = elements[0].element.base
                    let x = elements[0].element.x
                    let y = elements[0].element.y
                    if(y>base - 30){
                        y = y - 30
                    }
                    pos = {
                        x:x,
                        y:y
                    }
                }
                return pos;
            }

            
            const highlightbars = {
                id: 'highlightbars',
                afterEvent(chart, args){
                    function setBarColor(isActive,color){
                        return isActive ? color : '#E8EAED';
                    }
                    // console.log(chart)
                    if(args.inChartArea  === true){
                        data.datasets.forEach((el,idx)=> {
                            if(chart.getDatasetMeta(idx).data.some(element=>element.active)){
                                // console.log(true)
                                chart.getDatasetMeta(idx).data.forEach((element)=>{
                                    if(!element.active){
                                        element.options.backgroundColor = setBarColor(element.active,self.colors[idx])
                                    }
                                    
                                })
                            }
                        });
                        
                    }
                    else{
                        const index = chart.getDatasetMeta(0).index
                        data.datasets.forEach((element,idx) => {
                            chart.getDatasetMeta(idx).data.forEach((element)=>{
                                element.options.backgroundColor = setBarColor(true,self.colors[idx])
                            })
                        });
                    }
                    args.changed = true
                }
            }

            let plugins = [] // register the plugin
            if(highlight_effect){
                plugins.push(highlightbars)
            }

            // Tooltip Styles s
            this.tooltip_style1 = {
                position: 'customPos',
                displayColors: false,
                usePointStyle: false,
                yAlign: 'top',
                backgroundColor: 'rgb(255,255,255,0)',
                bodyColor: '#fff',
                callbacks: {
                    title: function(context) {
                        return null
                    },
                    label: function(context) {
                        // const label = context.dataset.label
                        const dataIndex = context.dataIndex
                        const value = context.dataset.data[dataIndex]
                        return value
                    },
                    labelPointStyles: function(){
                        return {}
                    },
                    labelTextColor: function(context) {
                      //   console.log(context)
                        const base = context.element.base
                        const y = context.element.y
                        if(y > base - 30){
                          return '#000';
                        }
                        else{
                          return '#fff';
                        }
                      
                  }
                }
            }

            const getOrCreateTooltip = (chart,tooltip) => {
                let tooltipEl = chart.canvas.parentNode.querySelector('div');
              
                if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.style.position = 'absolute'
                  // tooltipEl.style.transform = 'translate(-50%, 0)';
                  tooltipEl.style.transition = 'all .1s ease';
                  chart.canvas.parentNode.appendChild(tooltipEl);
                }
              
                return tooltipEl;
            };
              
            const externalTooltipHandler = (context) => {
                // Tooltip Element
                const {chart, tooltip} = context;
                const tooltipEl = getOrCreateTooltip(chart,tooltip);
              
                // Hide if no tooltip
                if (tooltip.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }
                let childItems = ''
                tooltip.dataPoints.forEach(element => {
                  childItems+= `
                  <div class="custom-tooltip1-item">
                    <div class="custom-tooltip1-item-highlight" style="background: ${element.dataset.backgroundColor}"></div>
                    <div class="custom-tooltip1-item-details">
                      <span class="custom-tooltip1-item-label">${element.dataset.label}</span>
                      <span class="custom-tooltip1-item-value">${element.dataset.data[element.dataIndex]} ${Object.keys(unitObj).indexOf(element.dataset.label) >= 0 ? unitObj[element.dataset.label].unit : ""}</span>
                    </div>
                  </div>
                  `
                });


                const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
                // Display, position, and set styles for font
          
                let left = positionX + (tooltip.caretX - 170)
                if(left + 300 > (chart.chartArea.right - 15)){
                  left = (chart.chartArea.right - 15) - 300
                }if(left < (chart.chartArea.left + 15)){
                  left = (chart.chartArea.left + 15) 
                }
          
                let top = positionY + (tooltip.caretY - 150)
                
                // console.log(tooltip.caretX)
                tooltipEl.innerHTML = `
                <div class="custom-tooltip1">
                  <span class="custom-tooltip1-label">${tooltip.title[0]}</span>
                  <div class="custom-tooltip1-items-container">
                    ${childItems}
                  </div>
                  <div class="custom-tooltip1-carret" style="left: ${tooltip.caretX - left - 10}px"></div>
                </div>`
          
          
              
                tooltipEl.style.opacity = 1;
                tooltipEl.style.left =  left + 'px';
                tooltipEl.style.top = top + 'px';
                tooltipEl.style.font = tooltip.options.bodyFont.string;
                tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
                tooltipEl.style.pointerEvents = 'none';
                
            };

            this.tooltip_style2 = {enabled: false,
                position: 'nearest',
                mode: 'index',
                external: externalTooltipHandler
            }

            


            // end of customization ------##

            if(tooltip_style == 'style2'){
                pref_tooltip = this.tooltip_style2
            }
            else {
                pref_tooltip = this.tooltip_style1
            }
            // set prefered tooltip style
            this.options.plugins.tooltip = pref_tooltip

            if(this.NewChart!=undefined){
                this.NewChart.destroy(); // for chart update and re-rendering purposes
            }
            
            this.NewChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: this.options,
                plugins: plugins // applies the custom plugin here
            });


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