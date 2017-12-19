import {Component, OnInit, DoCheck, Input, Output, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
let wangEditor = require('wangeditor');
@Component({
    selector: 'ai-wangEditor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.scss']
})
export class WangEditorComponent implements OnInit, DoCheck, AfterViewInit {

    @Input() content = '';
    @Input() readonly = false;
    @Input() menu = [];
    @Output() onContentChange = new EventEmitter();

    /*@ViewChild('header') header;
     @ViewChild('block') block;*/
    editor;


    defaultMenu = [
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        if (this.editor) {
            return;
        }
        // 创建编辑器
        this.editor = new wangEditor('#div1', '#div2');
        this.editor.customConfig.menus = this.menu && this.menu.length ? this.menu : this.defaultMenu;
        // 关闭粘贴样式的过滤
        // this.editor.customConfig.pasteFilterStyle = false;
        // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
        // editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        this.editor.create();
        // 是否可以编辑
        this.editor.$textElem.attr('contenteditable', !this.readonly);
        this.setHtml(this.content);
    }

    setHtml(content) {
        if (this.editor) {
            this.editor.txt.html(content);
        }
    }

    getHtml() {
        return this.editor ? this.editor.txt.html() : '';
    }

    onChange() {
        this.onContentChange.emit({content: this.getHtml()});
    }

    ngDoCheck() {
    }

}