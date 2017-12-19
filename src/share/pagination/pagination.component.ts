import {Component, OnInit, DoCheck, Input, Output, EventEmitter} from '@angular/core';
@Component({
    selector: 'ai-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.scss']
})
export class PaginationComponent implements OnInit, DoCheck {

    @Input() collectionSize = 10; // 总数
    @Input() pageNo = 1;
    @Input() pageSize = 15;
    @Output() onPageChange = new EventEmitter();
    maxSize = 3;
    totalPage = 0;
    jumpPage = 1;

    pageSizeAry = [10, 15, 30, 50, 100, 200, 500, 1000];

    inited = false;

    constructor() {
    }

    ngOnInit(): void {
        this.inited = true;
    }

    ngDoCheck() {
        this.totalPage = Math.ceil(this.collectionSize / this.pageSize);
    }

    _onPageSizeChange() {
        this.pageNo = 1;
        this.jumpPage = this.pageNo;
        this.onPageChange.emit({page_no: this.pageNo, page_size: this.pageSize});
    }

    _onPageChange(currentPage) {
        this.pageNo = currentPage;
        this.jumpPage = this.pageNo;
        this.onPageChange.emit({page_no: this.pageNo, page_size: this.pageSize});
    }

    jump() {
        this.pageNo = this.jumpPage;
        this._onPageChange(this.pageNo);
    }
}