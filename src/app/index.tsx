import { useMemo, useState } from "react";

import { getDomTree } from "./utils";
import { useResize } from "../hooks/useResize";
//
import type { Position, ShownNode, State } from "./types"
//
import './styles.scss';

const initialState: State = {
	target: 'body',
}

export function Widget() {
	const [state, setState] = useState(initialState);
	const { target, position } = state;

	const { top, left } = position || {};

	const dragStart = useResize({ setPosition, elemName: '.widget' });

	const node = useMemo(() => {	
		const targetNode = document.querySelector(target);
		if (!targetNode) return null;

		return getDomTree(targetNode);
	}, [target]);

	function setPosition(position: Position) {
		setState({ ...state, position });
	}

	console.log(node);
	
	return (
		<div className="widget" style={{ left, top }}>
			<div className="widget__controls">
				<div className="widget__control" onMouseDown={dragStart}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
						<path d="M19.5 9.5V6.26637L13.7676 12L19.5 17.73V14.4987H22V21.9987H14.5024V19.4987H17.7348L12 13.7664L6.26879 19.5H9.5V22H2V14.5012H4.5V17.7336L10.2324 12L4.5 6.26758V9.5H2V2H9.5V4.5H6.26637L12 10.2324L17.7324 4.5H14.5V2H22V9.5H19.5Z" fill="white"/>
					</svg>
				</div>
			</div>
			{ node && <WidgetRow node={node} /> } 
		</div>
	)
}

interface WidgetRowProps {
	node: ShownNode;
	level?: number;
}

function WidgetRow(props: WidgetRowProps) {
	const { node, level = 0 } = props;
	const { tagName, className, children } = node;

	const [isOpen, setIsOpen] = useState(false);

	const marginLeft = `${(level ? level / 2 + 1 : 0)}em`;

	function handleToggle() {
		setIsOpen(!isOpen);
	}

	return (
		<div className="row" style={{ marginLeft }}>
			<div className="node">
				{ !!children.length && (
					<div 
						className="node__toggler" 
						onClick={handleToggle}
					> 
						{ isOpen ? '▼' : '▶' }
					</div>
				)}
				<div className="node__tag">
					Tag name: 
					{ ' ' }
					{tagName}
				</div>
				<div className="node__class">{className}</div>
			</div>
			<div className="node__children" data-open={isOpen}>
				{children.map((child, ind) => <WidgetRow key={child.tagName + ind} node={child} level={level + 1} />)}
			</div>
		</div>
	)
}