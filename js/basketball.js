window.onload = function () {

  // 移动端
  let is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
  if (is_mobi) {
    window.location.href = "https://zhuanglinxin.github.io/vue-basketball-sort/dist";
  }

  let help = document.querySelector("#help")
  let close = document.querySelector(".close")
  let sortNav = document.querySelector("#sort")
  let about = document.querySelector("#about")

  about.addEventListener('click', function () {
    alert('联系作者：519737210@qq.com')
  })

  close.addEventListener('click', function () {
    this.parentNode.style.display = 'none'
  })

  help.addEventListener("click", function () {
    let help = document.querySelector('.help')
    help.style.display = help.style.display === 'block' ? 'none' : 'block'
  })

  let sortBox = document.querySelector('.sort')
  function showSort() {
    statistic()
    sortBox.style.transform = 'none'
  }
  function hideSort() {
    sortBox.style.transform = 'scale(0)'
  }
  sortNav.addEventListener("mouseenter", showSort)
  sortBox.addEventListener("mouseenter", showSort)
  sortNav.addEventListener("mouseleave", hideSort)
  sortBox.addEventListener("mouseleave", hideSort)

  // 统计人数
  let people = document.querySelector('#people')
  function statistic() {
    let num = document.querySelectorAll('.card').length
    people.innerText = `人数：${num}人`
  }

  // 删除
  let els = document.querySelectorAll('.card button')

  els.forEach(item => {
    item.addEventListener('click', function () {
      this.parentNode.parentNode.removeChild(this.parentNode)
    })
  })

  // 随机分配按钮
  document.querySelector("#btn1").addEventListener("click", function () {
    let list = document.querySelector('.list')
    var childs = list.childNodes;
    for (let i = childs.length - 1; i >= 0; i--) {
      list.removeChild(childs[i]);
    }
    let num = document.querySelector("#num").value // 获取人数
    num > 1 ? randomSort(parseInt(num)) : alert("输入人数错误！！")
  })

  document.querySelector("#btn2").addEventListener("click", function () {
    alert("此功能尚待开发！")
  })
  document.querySelector("#btn3").addEventListener("click", function () {
    alert("此功能尚待开发！")
  })
  document.querySelector("#btn4").addEventListener("click", function () {
    alert("此功能尚待开发！")
  })
  // 随机分配
  function randomSort(num) {
    let ret = []
    let cards = document.querySelectorAll(".card")
    ret = [...cards]
    ret.forEach((item, index) => {
      item.setAttribute('data-index', index)
    })

    ret = shuffle(ret)  // 随机排序

    let info = []

    ret.forEach(item => {
      let temp = [...item.children[2].children[1].children];
      info.push(getText(temp))
    })
    info.forEach((item, index) => {
      info[index] = item.map(i => i.slice(3))
    })

    let data = sortData(info, num)
    let a = setWeightandHeight(data)
    createDiv(data, a) // 创建节点
  }

  // 创建节点
  function createDiv(arr, a) {
    let list = document.querySelector('.list')
    arr.forEach((item, i) => {
      let div = document.createElement('div')
      let str = `第${i + 1}组: `
      item.forEach((it, index) => {
        if (index === item.length - 1) {
          str += `${it[1]},${it[2]},${it[3]} - 平均身高：${a[i][0]}cm,平均体重：${a[i][1]}kg`
        } else {
          str += `${it[1]},${it[2]},${it[3]} - `
        }
      })
      div.innerHTML = str
      list.appendChild(div)
    })
  }

  // 计算平均高度与体重
  function setWeightandHeight(arr) {
    let a = []
    arr.forEach((item) => {
      let height = 0
      let weight = 0
      item.forEach((it, index) => {
        height += parseInt(it[2].slice(0, 3))
        weight += parseInt(it[3].slice(0, 2))
        if (index === item.length - 1) {
          a.push([parseInt(height / (index + 1)), parseInt(weight / (index + 1))])
        }
      })
    })
    return a
  }

  // 分组数据
  function sortData(arr, num) {
    let newArr = []
    let temp = []

    for (let i = 0; i < arr.length; i++) {
      if (i % num === 0 && i !== 0) {
        newArr.push(temp)
        temp = []
      }
      temp.push(arr[i])
      if (i === arr.length - 1) {
        newArr.push(temp)
        break
      }
    }

    return newArr
  }

  // 获取文本数据
  function getText(arr) {
    let temp = []
    arr.forEach(item => {
      temp.push(item.innerText)
    })
    return temp
  }

  // min-max随机生成数字
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  // 随机排序数组
  function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
      let j = getRandomInt(0, i)
      let t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    return _arr
  }

}