var that = null;
class Tab {
	constructor(id) {
		that = this;
		//获取元素
		this.main = document.querySelector(id);
		this.add = this.main.querySelector('.tabadd');
		this.ul = this.main.querySelector('.firstnav ul:first-child');
		this.fsection = this.main.querySelector('.tabscon');
		this.init()
	}
	//获取所有小列
	updateNode() {
		this.lis = this.main.querySelectorAll('li');
		this.sections = this.main.querySelectorAll('section');
		this.remove = this.main.querySelectorAll('.remove');
		this.spans = this.main.querySelectorAll('.firstnav li span:first-child');
	}
	//初始化操作 
	init() {
		this.updateNode()
		this.add.onclick = this.addTab
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].index = i;
			this.lis[i].onclick = this.toggleTab;
			this.remove[i].onclick = this.removeTab;
			this.spans[i].ondblclick = this.editTab;
			this.sections[i].ondblclick = this.editTab;
		}
	}
	//清除样式
	clearClass() {
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].className = ''
			this.sections[i].className = ''
		}
	}
	//切换功能
	toggleTab() {
		that.clearClass();
		this.className = 'activeBlock';
		that.sections[this.index].className = 'conactive';
	}
	//添加功能
	addTab() {
		that.clearClass();
		var random = Math.random();
		let li = '<li class="liactivc  activeBlock"><span>新卡</span><span class="remove">x</span></li>';
		let section = '<section class="conactive">测试' + random + '</section>';
		that.ul.insertAdjacentHTML('beforeend', li);
		that.fsection.insertAdjacentHTML('beforeend', section);
		that.init()
	}
	//删除功
	removeTab(e) {
		e.stopPropagation();
		let index = this.parentNode.index;
		that.lis[index].remove()
		that.sections[index].remove()
		that.init()
		//当我们删除的不是选中状态的li，原来选中的li不变
		if (document.querySelector('.activeBlock')) return;
		//当我们删除选中状态这个li的时候，让它前一个处于选中状态
		index--;
		//手动调用点击事件
		that.lis[index] && that.lis[index].click();
	}
	//修改功能
	editTab() {
		let str = this.innerHTML;
		//双击禁止选中文字
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		this.innerHTML = '<input type="text"/>';
		let input = this.children[0];
		input.value = str;
		input.select(); //文本框里面的文字处于选中状态
		//当我们离开文本框就把文本框的值给span
		input.onblur = function() {
			this.parentNode.innerHTML = this.value
		}
		input.onkeyup=function(e){
			if(e.keyCode===13)this.blur();
		}
	}
}
new Tab('#tab')
