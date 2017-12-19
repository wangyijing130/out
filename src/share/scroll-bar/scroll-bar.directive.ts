import {
    AfterViewInit,
    Directive,
    DoCheck,
    ElementRef,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional
} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as Ps from 'perfect-scrollbar';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ScrollBarConfig, ScrollBarConfigInterface} from './scroll-bar.interfaces';

@Directive({
    selector: '[aiScrollBar]',
    providers: [{
        provide: ScrollBarConfig,
        useFactory: provideDefaultConfig
    }]
})
export class ScrollBarDirective implements OnInit, DoCheck, OnDestroy, AfterViewInit {

    @HostBinding('style.position') position = 'relative';

    private _width: number;
    private _height: number;

    private _contentWidth: number;
    private _contentHeight: number;

    private subscriptions: Array<Subscription> = [];

    @Input() config: ScrollBarConfigInterface;
    @Input() alwaysShow: boolean;
    @Input() resetOnRouteChange: boolean;
    @Input() autoTop = true; // 自动置顶

    constructor(private router: Router, public elementRef: ElementRef, @Optional() private defaults: ScrollBarConfig, private zone: NgZone) {

    }

    ngOnInit(): void {
        if (this.autoTop === undefined) {
            this.autoTop = true;
        }
        if (this.resetOnRouteChange) {
            let routerSubscription = this.router.events
                .filter(event => event instanceof NavigationEnd)
                .subscribe(() => this.update());
            this.subscriptions.push(routerSubscription);
        }
    }

    ngDoCheck() {

        if (!this.elementRef.nativeElement) {
            return;
        }
        let contentWidth = this._contentWidth;
        let contentHeight = this._contentHeight;

        let width = this.elementRef.nativeElement.offsetWidth;
        let height = this.elementRef.nativeElement.offsetHeight;

        if (this.elementRef.nativeElement.children && this.elementRef.nativeElement.children.length) {
            let firstChildren: HTMLElement = this.elementRef.nativeElement.children[0];
            contentWidth = firstChildren.offsetWidth;
            contentHeight = firstChildren.offsetHeight;
        }

        if (width !== this._width || height !== this._height || contentWidth !== this._contentWidth || contentHeight !== this._contentHeight) {
            this._width = width;
            this._height = height;

            this._contentWidth = contentWidth;
            this._contentHeight = contentHeight;

            this.update();
        }
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            Ps.destroy(this.elementRef.nativeElement);
        });

        this.subscriptions.forEach(item => item.unsubscribe());
    }

    ngAfterViewInit() {
        let config = new ScrollBarConfig(this.defaults);
        config.assign(this.config);
        this.zone.runOutsideAngular(() => {
            Ps.initialize(this.elementRef.nativeElement, config);
        });

        if (this.alwaysShow) {
            $(this.elementRef.nativeElement).addClass('show');
        } else {
            let subscription = Observable
                .fromEvent($(this.elementRef.nativeElement), 'mousewheel')
                .throttleTime(200)
                .map(() => $(this.elementRef.nativeElement))
                .do((element) => {
                    element.children('.ps-scrollbar-y-rail').children('.ps-scrollbar-y').css('opacity', 1);
                    element.children('.ps-scrollbar-x-rail').children('.ps-scrollbar-x').css('opacity', 1);
                })
                .debounceTime(1000)
                .subscribe((element) => {
                    element.children('.ps-scrollbar-y-rail').children('.ps-scrollbar-y').animate({'opacity': 0}, 500);
                    element.children('.ps-scrollbar-x-rail').children('.ps-scrollbar-x').animate({'opacity': 0}, 500);
                });
            this.subscriptions.push(subscription);
        }
    }

    update() {
        this.zone.runOutsideAngular(() => {
            if (this.autoTop) {
                this.elementRef.nativeElement.scrollTop = 0;
            }
            Ps.update(this.elementRef.nativeElement);
        });
    }

    // 滚动条向顶部部移动 offset：距离顶部多远，不传表示到最顶端
    scrollToTop(offset?: number, speed?: number) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    }

    // 滚动条向底部移动 offset：距离底部多远，不传表示到最底端
    scrollToBottom(offset?: number, speed?: number) {
        const height = this.elementRef.nativeElement.scrollHeight;
        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    }

    // 采用动画效果移动滚动条
    animateScrolling(target: string, value: number, speed?: number) {
        if (!speed) {
            this.elementRef.nativeElement[target] = value;

            // PS has weird event sending order, this is a workaround for that
            this.update();

            this.update();
        } else if (value !== this.elementRef.nativeElement[target]) {
            let newValue = 0;
            let scrollCount = 0;

            let oldTimestamp = performance.now();
            let oldValue = this.elementRef.nativeElement[target];

            let cosParameter = (oldValue - value) / 2;

            let step = (newTimestamp) => {
                scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));

                newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));

                // Only continue animation if scroll position has not changed
                if (this.elementRef.nativeElement[target] === oldValue) {
                    if (scrollCount >= Math.PI) {
                        this.elementRef.nativeElement[target] = value;

                        // PS has weird event sending order, this is a workaround for that
                        this.update();

                        this.update();
                    } else {
                        this.elementRef.nativeElement[target] = oldValue = newValue;

                        oldTimestamp = newTimestamp;

                        window.requestAnimationFrame(step);
                    }
                }
            };

            window.requestAnimationFrame(step);
        }
    }
}


function provideDefaultConfig(): ScrollBarConfig {
    return new ScrollBarConfig();
}