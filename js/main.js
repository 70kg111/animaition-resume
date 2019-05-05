var result = `/* 老哥，我是 aning
* 我是孙笑川的狗粉丝，GKD！！！

* 只用文字太单调了，我要开始啦

* 首先准备一些样式
*/

/* 过渡动画 */
*{
    transition: all 0.5s;
}

/* 字体、背景色 */
body{
    background: rgb(222,222,222);
    font-size: 16px;
}

/* 文本内容加上边框 */
#code{
    border: 1px solid black;
    padding: 20px;
}

/* 我需要一些代码高亮 */
.token.property{
    color: #905;
}
.token.selector{
    color: #690;
}
.token.function{
    color: #DD4A68;
}

/*加一个呼吸效果*/
#code{
    animation: breath 0.5s infinite alternate-reverse;
}

/* 加点效果，原地旋转360度螺旋升天 */
#code{
    transform: rotate(360deg);
}

/* 不玩了，正经吹一会 */
/* 我需要一张白纸 */

#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}

#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

#paper > .content{
    background: white;
    width: 100%;
    height: 100%;
}`

var result2 = `
/* 有了，请看右边 */
`
var result3 = `



/* 看完了，苏喂苏喂苏喂~ */
`

var md = `
#自我介绍

我叫 孙笑川 ，他们都叫我孙狗

说的最多的是 nmsl

#别人知道比较多的事

1、根本就没有孙笑川，或者人人都是孙笑川

2、巴黎圣母院是我烧的

3、老来来是我踢的

4、照蔡徐坤的激光笔也是我照的

5、你吼辣么大声干什么嘛
`


wirteCode('', result, () => {   //createPaper是第一次回调
    createPaper(() => {
        wirteCode(result, result2,() => {
            writeMarkdown(md,() => {
                wirteCode(result + result2,result3)
            })
        })  //在 createPaper 内部再做一次回调
        //result是prefix，就是之前已有的代码；result2是code，就是需要在后面新增的代码
    })
})



//把 code 写到 #code 和 <style> 里面去
function wirteCode(prefix, code, fn) {
    //这里的fn是回调函数，因为这是异步操作，回调可以拿到异步的结果
    //这里的prefix是前缀，表示之前已经有的不需要更改的代码，获取到后就可以在这个后面增加内容
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0;
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        //遍历子字符串，这里是给用户看的，然后引入Prism库
        styleTag.innerHTML = prefix + code.substring(0, n)  //在style里面加才有效果
        domCode.scrollTop = 10000   //让窗口跟着内容自动往下滚
        if (n >= code.length) {   //如果遍历完了就结束
            window.clearInterval(id)
            fn && fn.call()   //这里一定要调用一下
        }
    }, 50)
}



//第二个步骤，一张白纸
function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    fn && fn.call()
}



//第三个步骤，写markdown到白纸里面
function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0;
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = 10000   //让窗口跟着内容自动往下滚
        if (n >= markdown.length) {   //如果遍历完了就结束
            window.clearInterval(id)
            fn && fn.call()   //这里一定要调用一下
        }
    }, 50)
}