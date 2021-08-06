import React, {useEffect, useState} from "react";
import './Tree.css';

const style = {
	marginLeft: '20px'
}

function Tree({data, level, parentCallback: callback, hide}) {
	const [opened, setOpened] = useState(false);
	
	const className = () => {
		let name = ``;
		if (data.children.length) {
			name = `name${opened ? ' opened' : ''}`;
		}
		return name
	}
	
	useEffect(() => {
		if (hide === true) {
			closeBranch()
		}
	}, [hide])
	
	const hasChildren = () => data.hasOwnProperty('children') && data.children.length > 0;
	
	const renderBranches = () => {
		if (hasChildren()) {
			const newLevel = level + 1;
			return data.children.sort(function (a, b) {
				return b.length - a.length
			}).map((el, index) => (
				<Tree key={index} hide={hide} parentCallback={parentCallback} level={newLevel} data={el}/>)
			)
		}
	}
	
	const parentCallback = (status) => {
		if (hide) setOpened(false)
		if (callback) callback(status)
	}
	
	const toggleBranch = () => {
		if (data.children.length > 0) {
			setOpened(!opened)
			callback(false)
		} else {
			callback(true)
		}
	}
	const closeBranch = () => {
		setOpened(false)
	}
	
	return (
		<div style={style}>
			<span className={className()} onClick={toggleBranch}>{data.name}</span>
			{opened && renderBranches()}
		</div>
	)
}

export default Tree
