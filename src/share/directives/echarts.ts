// tslint:disable
import {Directive, DoCheck, ElementRef, Input, KeyValueDiffer, KeyValueDiffers, OnDestroy} from '@angular/core';

let ECharts = require('echarts/lib/echarts');

import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/axis';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

@Directive({
    selector: '[echarts]'
})
export class EchartsDirective implements OnDestroy, DoCheck {

    @Input('echarts') options: any;

    private chart: any;
    private currentWidth: number;
    private currentHeight: number;
    private differ: KeyValueDiffer<any, any>;

    constructor(private el: ElementRef, private differs: KeyValueDiffers) {
        this.differ = differs.find({}).create();
    }

    resize() {

        if (!this.chart || !this.options) {
            return;
        }

        this.chart.resize();
    }

    ngDoCheck() {
        if (this.currentWidth != this.el.nativeElement.offsetWidth) {
            this.resize();
            this.currentWidth = this.el.nativeElement.offsetWidth;
        }
        if (this.currentHeight != this.el.nativeElement.offsetHeight) {
            this.resize();
            this.currentHeight = this.el.nativeElement.offsetHeight;
        }
        if (this.differ.diff(this.options)) {
            this.draw(this.options);
        }
    }

    ngOnDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    draw(opt: any): void {
        if (!opt) {
            console.log('No valid options...');
            console.log(opt);
            return;
        }

        if (opt.series || opt.data) {
            if (opt.dispose) {
                this.chart.dispose();
            }
            if (opt.clear) {
                this.chart.clear();
            }

            if (!this.chart) {
                this.chart = ECharts.init(this.el.nativeElement, opt.theme ? opt.theme : 'default');
            }

            if (opt.loading) {
                this.chart.showLoading();
            }

            this.chart.setOption(opt);
            if (opt.loading) {
                this.chart.hideLoading();
            }

            if (opt.dispatchAction) {
                this.chart.dispatchAction(opt.dispatchAction);
            }

            if (opt.off) {
                for (let event of Object.keys(opt.off)) {
                    this.chart.off(event, opt.off[event])
                }
            }

            if (opt.on) {
                for (let event of Object.keys(opt.on)) {
                    this.chart.on(event, opt.on[event])
                }
            }

        } else {
            console.log('No valid options...');
            console.dir(opt);
        }
    }

}
export class EchartPie {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: []
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.25)'
                    }
                }
            }
        ],
        color: ['#00cb99', '#0da4d3', '#f77700', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    };

    // data = [{name:'',value:string/number}];
    constructor(title, data) {
        if (title) {
            this.option.series[0].name = title;
        }
        if (data && data.length) {
            this.option.series[0].data = data;
            data.forEach(d => {
                this.option.legend.data.push(d.name);
            });
        }
    }

    getOps() {
        return this.option;
    }
}

export class EchartCircle {
    option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: []
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: []
            }
        ],
        color: ['#00cb99', '#0da4d3', '#f77700', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    };

    constructor(title, data) {
        if (title) {
            this.option.series[0].name = title;
        }
        if (data && data.length) {
            this.option.series[0].data = data;
            data.forEach(d => {
                this.option.legend.data.push(d.name);
            });
        }
    }

    getOps() {
        return this.option;
    }
}

// 仪表盘
export class EchartGauge {
    option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '',
                type: 'gauge',
                radius: '100%',
                detail: {formatter: '{value}%'},
                data: [],
                axisLine: {
                    lineStyle: {
                        color: [
                            [0.2, '#00cb99'],
                            [0.8, '#0da4d3'],
                            [1, '#f77700']
                        ]
                    }
                }
            }
        ]
    };

    constructor(title, data) {
        if (title) {
            this.option.series[0].name = title;
        }
        if (data && data.length) {
            this.option.series[0].data = data;
        }
    }

    getOps() {
        return this.option;
    }
}
 // 线性表
export class EchartLine {
    option = {
        title: {
            top: '5',
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [],
            top: '35',
        },
        grid: {
            top: '25%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '',
                type: 'line',
                stack: '',
                data: []
            },
            {
                name: '',
                type: 'line',
                stack: '',
                data: []
            },
            {
                name: '',
                type: 'line',
                stack: '',
                data: []
            },
            {
                name: '',
                type: 'line',
                stack: '',
                data: []
            },
            {
                name: '',
                type: 'line',
                stack: '',
                data: []
            }
        ]
    };

    constructor(title, data, xaxis, p) {
        if (title && p == true) {
            this.option.title.text = title.p1;
        }
        if (title && p !== true) {
            this.option.title.text = title.p2;
        }
        if (xaxis) {
            this.option.xAxis.data = xaxis;
        }
        if (data && data.length) {
            for(var i=0;i<5;i++)
                for(var j=0;j<7;j++){
              this.option.series[i].data.push(data[i].data[j]);
                }
            for(var i=0;i<5;i++){
              this.option.legend.data.push(data[i].name);
              this.option.series[i].name = data[i].name;
              this.option.series[i].stack = p;
            }
        }
    }

    getOps() {
        return this.option;
    }
}
