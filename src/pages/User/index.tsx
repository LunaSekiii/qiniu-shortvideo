import HomePageLayout from "@/layouts/HomePageLayout";
import style from "./User.module.scss";
import ParamsChecker from "@/components/ParamsCheck";
import { useRef, useState } from "react";

/**
 * 用户主页
 */
function User() {
	const [activeTab, setActiveTab] = useState(0);
	const dialogRef = useRef<HTMLDialogElement>(null);
	return (
		<HomePageLayout>
			<div className={style["user-page"]}>
				<h1>用户主页</h1>
				<div className={style.tabs}>
					<div className={style.tab} data-active>
						作品 100
					</div>
					<dialog
						ref={dialogRef}
						onClose={(e) => {
							console.log(e.currentTarget.returnValue, "sss");
						}}
					>
						<form method='dialog'>
							<button>aaa</button>
							<button value={"bbb"}>bbb</button>
						</form>
					</dialog>
					<div
						className={style.tab}
						onClick={() => {
							dialogRef.current?.showModal();
						}}
					>
						历史 200
					</div>
					<div className={style.tab}>喜欢 300</div>
					<div className={style.tab}>收藏 300</div>
				</div>
			</div>
		</HomePageLayout>
	);
}

const ParamsCheckedUser = () => (
	<ParamsChecker
		checkOption={({ userId }) =>
			!isNaN(Number(userId)) || userId === "self"
		}
		redirect='/'
	>
		<User />
	</ParamsChecker>
);

export default ParamsCheckedUser;
