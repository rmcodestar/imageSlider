/*
 * @Author  : rmcodestar@naver.com
 * @Date    : 2016-06-11
 * @What    : image slider plugin
 * @Option  :
    var imageSlider = new ImageSlider();
    imageSlider.init({
         "selector": "#imaSlider2", //required
         "width": "200px",          //optional
         "height": "200px",         //optional
         "buttonWidth": "20px",     //optional
         "buttonHeight": "20px"     //optional
     });
 */

function ImageSlider (option) {
    this.selector = null;
    this.currentPage = 1;
    this.pageSize = 0;
    this.pageGuideType = {TEXT : "TEXT", IMAGE : "IMAGE"};

    this.init = function(option) {
        this.selector = document.querySelector(option.selector);
        if(!this.selector) {
            return;
        }

        this.selector.style.width = option.width || "650px";
        this.selector.style.height = option.height || "500px";
        this.selector.querySelector(".imgSlider_btn.before").style.width = option.buttonWidth || "30px";
        this.selector.querySelector(".imgSlider_btn.before").style.height = option.buttonHeight || "30px";
        this.selector.querySelector(".imgSlider_btn.after").style.width = option.buttonWidth || "30px";
        this.selector.querySelector(".imgSlider_btn.after").style.height = option.buttonHeight || "30px";

        this.currentPage = option.currentPage || 1;
        if(!this.selector.classList.contains("imgSlider")){
            this.selector.classList.add("imgSlider");
        }
        this.pageSize = this.selector.querySelectorAll(".imgSlider_imgList ul li").length;

        this.showPage(1);

        this.selector.querySelector(".imgSlider_btn.before").addEventListener("click", this.onClickBeforeButton.bind(this));
        this.selector.querySelector(".imgSlider_btn.after").addEventListener("click", this.onClickNextButton.bind(this));

        this.initPageGuider(option.pageGuideType);
        if (option.animation == true) {
            this.animation();
        }

    };
    this.onClickBeforeButton = function () {
        if (this.pageSize > 0) {
            if (--this.currentPage <= 0) {
                this.currentPage = this.pageSize;
            }
            this.showPage(this.currentPage);
        }
    };
    this.onClickNextButton = function () {
        if (this.pageSize > 0) {
            if (++this.currentPage > this.pageSize) {
                this.currentPage = 1;
            }
            this.showPage(this.currentPage);
        }
    };
    this.setPageText = function () {
        //TODO jquery --> js
        jQuery(".imgslider_pageGuider", this.selector).text(this.currentPage + " / " + this.pageSize);
    };
    this.showPage = function (selectedPage) {
        if (selectedPage > 0 && selectedPage <= this.pageSize) {
            var betofePage = this.selector.querySelector(".imgSlider_imgList > ul > li.active");
            if (betofePage) {
                betofePage.classList.remove("active");
            }
            this.selector.querySelector(".imgSlider_imgList > ul > li:nth-of-type(" + selectedPage + ")").classList.add("active");
        }
    };
    this.initImagePageGuider = function () {
        var guider = this.selector.querySelector(".imgslider_pageGuider");
        for (var i = 0; i < this.pageSize; i++) {
            var newItem = document.createElement("div");
            newItem.classList.add("dot");
            if(i == 0) {
                newItem.classList.add("orange");
            }
            guider.appendChild(newItem);
        }
    };
    this.setPageGuider = function (){
        this.selector.querySelector(".imgslider_pageGuider > div.dot.orange").classList.remove("orange");
        this.selector.querySelector(".imgslider_pageGuider > div.dot:nth-of-type(" + this.currentPage + ")").classList.add("orange");
    };

    this.initPageGuider = function (pageGuideType) {
        if (!pageGuideType) {
            return;
        }
        if (pageGuideType.toUpperCase() == this.pageGuideType.IMAGE) {
            this.initImagePageGuider();
            this.selector.querySelector(".imgslider_pageGuider").classList.add("image");
            this.selector.querySelector(".imgSlider_btn.before").addEventListener("click", this.setPageGuider.bind(this));
            this.selector.querySelector(".imgSlider_btn.after").addEventListener("click", this.setPageGuider.bind(this));
        } else if (pageGuideType.toUpperCase() == this.pageGuideType.TEXT) {
            this.setPageText(1);
            this.selector.querySelector(".imgslider_pageGuider").classList.add("text");
            this.selector.querySelector(".imgSlider_btn.before").addEventListener("click", this.setPageText.bind(this));
            this.selector.querySelector(".imgSlider_btn.after").addEventListener("click", this.setPageText.bind(this));
        }
    };
    this.animation = function () {
        this.selector.querySelector(".imgSlider_imgList > ul").classList.add("animation");
    }
}