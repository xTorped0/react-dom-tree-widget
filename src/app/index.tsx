import { useMemo, useReducer, useState } from "react";

import { getDomTree } from "./utils";
import { useResize } from "../hooks/useResize";
//
import { WidgetRow } from "./WidgetRow";
//
import type { Position, State } from "./types"
//
import './styles.scss';

const initialState: State = {
	target: document.body,
	isExpanded: false
}

export function Widget() {
	const [state, setState] = useState(initialState);
	const { target, position, isHidden, isExpanded } = state;

	const [needToBeUpdated, forceUpdate] = useReducer(x => x + 1, 0);

	const { top, left } = position || {};

	const dragStart = useResize({ setPosition, elemName: '.widget' });

	const node = useMemo(() => {	
		if (!target) return null;

		return getDomTree(target);
	}, [target, needToBeUpdated]);

	function setPosition(position: Position) {
		setState({ ...state, position });
	}

	function setIsHidden() {
		setState({ ...state, isHidden: !isHidden });
	}

	function updateNodeTree() {
		forceUpdate();
	}

	function onExpandedChange(e: React.ChangeEvent<HTMLInputElement>) {
		setState({ ...state, isExpanded: e.target.checked });
	}
	
	return (
		<div className="widget" data-hidden={isHidden} style={{ left, top }}>
			<div className="widget__controls">
				<span className="widget__control" onMouseDown={dragStart}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
						<path d="M19.5 9.5V6.26637L13.7676 12L19.5 17.73V14.4987H22V21.9987H14.5024V19.4987H17.7348L12 13.7664L6.26879 19.5H9.5V22H2V14.5012H4.5V17.7336L10.2324 12L4.5 6.26758V9.5H2V2H9.5V4.5H6.26637L12 10.2324L17.7324 4.5H14.5V2H22V9.5H19.5Z" />
					</svg>
				</span>
				<span className="widget__control" onClick={setIsHidden}>
					<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
						<path d="M2.24626 2.54167C2.12126 2.79167 2.99626 4 4.2046 5.25L6.41293 7.5H4.66293C3.37126 7.5 2.91293 7.66667 2.91293 8.125C2.91293 8.625 3.49626 8.75 5.8296 8.75H8.74626V5.83333C8.74626 3.5 8.62126 2.91667 8.12126 2.91667C7.66293 2.91667 7.49626 3.375 7.49626 4.66667V6.41667L5.28793 4.25C2.9546 1.95833 2.7046 1.83333 2.24626 2.54167Z" />
						<path d="M14.6667 4.25L12.5 6.45833V4.66667C12.5 3.375 12.3333 2.91667 11.875 2.91667C11.375 2.91667 11.25 3.5 11.25 5.83333V8.75H14.1667C16.5 8.75 17.0833 8.625 17.0833 8.125C17.0833 7.66667 16.625 7.5 15.3333 7.5H13.5833L15.7917 5.25C17 4 17.875 2.79167 17.75 2.54167C17.2917 1.79167 16.9583 1.95833 14.6667 4.25Z" />
						<path d="M2.91237 11.8715C2.91237 12.3298 3.37071 12.4965 4.66237 12.4965H6.41237L4.16237 14.7881C2.37071 16.5798 1.99571 17.1631 2.41237 17.5798C2.82904 17.9965 3.41237 17.6215 5.20404 15.8298L7.49571 13.5798V15.3298C7.49571 16.6215 7.66237 17.0798 8.12071 17.0798C8.62071 17.0798 8.74571 16.4965 8.74571 14.1631V11.2465H5.82904C3.49571 11.2465 2.91237 11.3715 2.91237 11.8715Z" />
						<path d="M11.25 14.1631C11.25 16.4965 11.375 17.0798 11.875 17.0798C12.3333 17.0798 12.5 16.6215 12.5 15.3298V13.5798L14.7917 15.8298C16.5833 17.6215 17.1667 17.9965 17.5833 17.5798C18 17.1631 17.625 16.5798 15.8333 14.7881L13.5833 12.4965H15.3333C16.625 12.4965 17.0833 12.3298 17.0833 11.8715C17.0833 11.3715 16.5 11.2465 14.1667 11.2465H11.25V14.1631Z" />
					</svg>
				</span>
				<span className="widget__control" onClick={updateNodeTree}>
					<svg height="16" width="16" viewBox="0 0 489.645 489.645">
						<g>
							<path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3
								c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5
								c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8
								c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2
								C414.856,432.511,548.256,314.811,460.656,132.911z"/>
						</g>
					</svg>
				</span>
			</div>
			{ node && !isHidden && (
				<>
					<div className="widget__settings">
						<div className="expanded">
							<input 
								id="expanded" 
								type="checkbox" 
								checked={isExpanded} 
								onChange={onExpandedChange} 
							/>
							<label htmlFor="expanded">Is expanded by default</label>
						</div>
					</div>
				
					<div className="widget__rows">
						<WidgetRow element={node} isExpanded={isExpanded} /> 
					</div>
				</>
			)}
		</div>
	)
}

{/* <div className="target">
	<label htmlFor="target">Target</label>
	<select 
		id="target" 
		className="target__select"
		value={target} 
		onChange={onNodeSelect} 
	>
		{ nodesList?.map(({ id, name }) => (<option key={id} value={id}> { name } </option>))}
	</select>
</div> */}
// function onNodeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
// 	const value = +e.target.value;
// 	const item = nodesList.find(({ id }) => id === value);

// 	if(item) setState({ ...state, target: item?.node });
// }