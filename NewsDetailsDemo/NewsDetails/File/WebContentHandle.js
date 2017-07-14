
$(function(){
  
  var divs = $("body").find("div.image");
  
  for(var i = 0; i < divs.length; i++){
  
  var div = divs.eq(i);
  
  var img = div.find("img.image");
  
  img.attr({"data-index": i});
  
  configImgState(img.attr("data-state") , i);
  }
  
  divs.click(function(){
             
             var img = $(this).find("img.image");
             
             var index = img.attr("data-index");
             
             var state = img.attr("data-state");
             
             switch(parseInt(state)) {
             
             case 2:
             
             // 加载图片
             window.webkit.messageHandlers.loadImage.postMessage(index);
             
             break;
             
             case 3:
             
             // 加载图片
             window.webkit.messageHandlers.loadImage.postMessage(index);
             
             break;
             
             case 4:
             
             // 点击图片
             window.webkit.messageHandlers.clickImage.postMessage(index);
             
             break;
             
             case 5:
             
             // 加载gif图片
             window.webkit.messageHandlers.loadGifImage.postMessage(index);
             
             // 设置加载中状态
             img.attr({"data-state":1});
             
             break;
             default:
             }
             
             });
  
});

/**
 设置背景颜色
 
 @param color       颜色字符串 ('FFFFFF')
 @param className   元素名称或id或class (选填 空为body)
 */
function configBackgroundColor(color,className){
    
    var o = className == undefined ? "html" : className;
    
    $(o).css({"background-color" : color});
}

/**
 设置字体颜色
 
 @param color       颜色字符串 ('FFFFFF')
 @param className   元素名称或id或class (选填 空为body)
 */
function configFontColor(color,className){
    
    var o = className == undefined ? "body" : className;
    
    $(o).css({"color" : color});
}

/**
 设置字体大小
 
 @param size        字号 ('20')
 @param className   元素名称或id或class (选填 空为body)
 */
function configFontSize(size,className){
    
    var o = className == undefined ? "body" : className;
    
    $(o).css({"font-size" : parseFloat(size) + "px"});
}

/**
 设置图片url
 
 @param index       下标 ('1')
 @param url         图片url ('http://lixiang.png')
 @param className   元素名称或id或class (选填 空为body)
 */
function setImageUrl(index, url, className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.image").eq(parseFloat(index));
    
    div.find("img.image").attr("src" , url);
}

/**
 设置Img状态
 
 @param state       状态码 [0:初始加载] [1:加载中] [2:点击加载] [3:加载失败] [4:加载完成] [5:gif]
 @param index       下标 ('1')
 @param className   元素名称或id或class (选填 空为body)
 */
function configImgState(state, index, className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.image").eq(parseFloat(index));
    
    var img = div.find("img.image");
    
    var span = div.find("span.load");
    
    state = parseFloat(state);
    
    switch (state) {
            
        case 0:
            
            // 初始状态
            img.attr({"data-state":0 , "id":"defaultscale"});
            
            span.text("LEE");
            
            break;
        case 1:
            
            // 加载中
            img.attr({"data-state":1 , "id":"defaultscale"});
            
            span.text("加载中");
            
            break;
        case 2:
            
            // 点击加载
            img.attr({"data-state":2 , "id":"defaultscale"});
            
            span.text("点击加载");
            
            break;
        case 3:
            
            // 加载失败
            img.attr({"data-state":3 , "id":"defaultscale"});
            
            span.text("加载失败 点击加载");
            
            break;
        case 4:
            
            // 状态置为4
            img.attr({"data-state":4 , "id":""});
            
            span.text("");
            
            // 判断是否存在gif图标元素 如果有则移除
            if (div.find('img.icon').length > 0) div.find('img.icon').remove();
            
            break;
        case 5:
            
            // 移除原有进度条
            if (div.find('div.progress').length > 0){
                
                div.find('div.progress').remove();
            }
            
            if (div.find('img.icon').length == 0) {
                
                // 添加gif图标
                $('<img>',{class:'icon', alt:'gif'})
                .attr({"src":"../defaultimage/load_image_gif_icon.png"})
                .css({
                     top:'50%',
                     left:'50%',
                     'margin-top':'-30px',
                     'margin-left':'-30px',
                     width:'60px',
                     height:'auto',
                     position:'absolute',
                     'z-index':'2'
                     })
                .appendTo(div);
            }
            
            // 状态置为5
            img.attr({"data-state":5 , "id":""});
            
            span.text("");
            
            break;
    }
    
}

/**
 移除图片属性
 
 @param index       下标 ('1')
 @param attr        属性名
 @param className   元素名称或id或class (选填 空为body)
 */
function removeImgAttr(index , attr , className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.image").eq(parseFloat(index));
    
    var img = div.find("img.image");
    
    img.removeAttr(attr);
}

/**
 返回Img个数
 
 @param className   元素名称或id或class (选填 空为body)
 */
function getImageCount(className){
   
    var o = className == undefined ? "body" : className;
    
    var divs = $(o).find("div.image");
    
    var len = divs.length;
    
    return len;
}

/**
 获取图片信息
 
 @param index       下标 ('1')
 @param className   元素名称或id或class (选填 空为body)
 */
function getImageInfo(index,className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.image").eq(parseFloat(index));
    
    var img = div.find("img.image");
    
    if(!img) return; //没有找到图片
    
    return {"current" : img.attr("src") , "thumbnail" : img.attr("data-thumbnail") , "original" : img.attr("data-original") , "gif" : img.attr("data-gif")};
}

/**
 返回所有图片信息 ({"" : "" , "" : "" , "" : ""})
 
 @param className   元素名称或id或class (选填 空为body)
 */
function getImageInfos(className){
    
    var ary = [];
    
    var o = className == undefined ? "body" : className;
    
    var divs = $(o).find("div.image");
    
    for(var i = 0; i < divs.length; i++){
        
        ary[ary.length] = getImageInfo(i , className);
    }
    
    return ary;
}

/**
 返回文字内容
 
 @param className   元素名称或id或class (选填 空为body)
 */
function getContentString(className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.content");
    
    return div.text();
}

/**
 返回内容高度
 
 @param className   元素名称或id或class (选填 空为body)
 */
function getContentHeight(className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.content");
    
    return div.outerHeight(true);
}

/**
 设置图片加载进度
 
 @param index       下标 ('1')
 @param progress    进度 0.0 - 1.0
 @param className   元素名称或id或class (选填 空为body)
 */
function configLoadingProgress(index, progress, className){
    
    var o = className == undefined ? "body" : className;
    
    var div = $(o).find("div.image").eq(parseFloat(index));
    
    var img = div.find("img.image");
    
    // 判断是否存在gif图标元素 如果有则移除
    if (div.find('img.icon').length > 0) div.find('img.icon').remove();
    
    if (progress == 0) {
        
        // 移除原有进度条
        if (div.find('div.progress').length > 0){
            
            div.find('div.progress').remove();
        }
        
    }
    
    if (progress > 0) {
        
        // 添加进度条div
        if (div.find('div.progress').length == 0){
            
            $('<div>',{class:'progress'}).css({
                                              top:'50%',
                                              left:'50%',
                                              'margin-top':'-30px',
                                              'margin-left':'-30px',
                                              width:'60px',
                                              height:'60px',
                                              position:'absolute',
                                              'z-index':'2'
                                              }).appendTo(div);
            
            radialIndicator.defaults.radius = 25;
            radialIndicator.defaults.barBgColor = "#EEEEEE7F";
            radialIndicator.defaults.barColor = "#EA1F1F";
            radialIndicator.defaults.fontColor = "#EEEEEE";
            radialIndicator.defaults.barWidth = 5;
            radialIndicator.defaults.roundCorner = true;
            radialIndicator.defaults.percentage = true;
            
            div.find('div.progress').radialIndicator();
        }
        
        // 设置进度条div宽度百分比
        var radialObj = div.find('div.progress').data('radialIndicator');
        radialObj.animate(progress * 100);
    }
    
    if (progress == 1) {
        
        if (div.find('div.progress').length > 0){
            
            // 淡出动画 隐藏进度条
            div.find('div.progress').fadeOut(500 , function () {
                                             
                                             // 动画结束 移除进度条
                                             div.find('div.progress').remove();
                                             });
        }
        
    }
    
}
