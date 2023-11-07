import style from "./User.module.scss";
import { userInfoTabMap } from "./userInfoTabMap";

export function UserInfoTab(props: {
	activeTab: string;
	setAvtiveTab: (index: string) => void;
	isSelf: boolean;
}) {
	const { activeTab, setAvtiveTab, isSelf } = props;
	return (
		<div className={style.tabs}>
			{(isSelf ? userInfoTabMap : userInfoTabMap.slice(0, 2)).map(
				(tab) => (
					<div
						className={style.tab}
						data-active={tab.tab === activeTab}
						key={tab.tab}
						onClick={() => setAvtiveTab(tab.tab)}
					>
						{tab.name}
					</div>
				)
			)}
		</div>
	);
}
