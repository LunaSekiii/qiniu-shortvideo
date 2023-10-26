import style from "./Navbar.module.scss";

function Navbar() {
	return (
		<div className={style.navbar}>
			<title>Fleeting Flow</title>
			<div className={style.main}>
				<menu>
					<ul>
						<li>首页</li>
						<li data-active={true}>推荐</li>
						<li>关注</li>
						<li>朋友</li>
						<li>我的</li>
						<hr />
						<li>直播</li>
						<li>放映厅</li>
						<li>知识</li>
						<li>热点</li>
						<li>游戏</li>
						<li>娱乐</li>
						<li>二次元</li>
						<li>音乐</li>
						<li>美食</li>
						<li>体育</li>
						<li>时尚</li>
						<hr />
						<li>Lorem.</li>
						<li>Voluptates!</li>
						<li>Quo.</li>
						<li>Mollitia.</li>
						<li>Quis.</li>
					</ul>
				</menu>
				<div>其他信息</div>
				<div>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Sunt omnis doloremque officiis itaque saepe, reiciendis
					vitae, quas eaque iure aspernatur facilis, temporibus
					inventore ipsum quod? Autem fugiat consequuntur quos
					consectetur.
				</div>
			</div>
		</div>
	);
}

export default Navbar;
