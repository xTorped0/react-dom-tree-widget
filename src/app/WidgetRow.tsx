import { useState } from "react";

import type { ShownNode } from "./types";

interface WidgetRowProps {
	node: ShownNode;
	level?: number;
	isExpanded?: boolean;
}

export function WidgetRow(props: WidgetRowProps) {
	const { node, level = 0, isExpanded = false } = props;
	const { id, tagName, className, children } = node;

	const [isOpen, setIsOpen] = useState(false);

	const hasOpenButton = !isExpanded && !!children.length;
	const marginLeft = isExpanded ? `${level / 2}em` : `${(level ? level / 2 + 1 : 0)}em`;

	function handleToggle() {
		setIsOpen(!isOpen);
	}

	return (
		<div className="row" style={{ marginLeft }}>
			<div className="node">
				{ hasOpenButton && (
					<div 
						className="node__toggler" 
						onClick={handleToggle}
						data-open={isOpen}
					> 
					<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
						<path d="M18.447 15.4342L10.5765 4.58371C10.2908 4.19085 9.70594 4.19085 9.42246 4.58371L1.54969 15.4342C1.53032 15.4608 1.51871 15.4924 1.51616 15.5252C1.51361 15.5581 1.52021 15.5911 1.53524 15.6204C1.55026 15.6498 1.57312 15.6744 1.60128 15.6916C1.62944 15.7087 1.66181 15.7177 1.69478 15.7176H3.36889C3.48273 15.7176 3.58987 15.6618 3.65684 15.5703L9.99835 6.82924L16.3399 15.5703C16.4068 15.6618 16.514 15.7176 16.6278 15.7176H18.3019C18.447 15.7176 18.5318 15.5525 18.447 15.4342Z" fill="#fff"/>
					</svg>
					</div>
				)}
				<div className="node__tag">
					Tag name: 
					{ ' ' }
					{tagName}
				</div>
				{ className && <span className="node__class">.{className}</span> }
				{ id && <span className="node__class">#{id}</span> }
			</div>
			<div className="node__children" data-open={isExpanded || isOpen}>
				{children.map((child, ind) => (
					<WidgetRow 
						key={child.tagName + ind} 
						node={child} 
						level={level + 1} 
						isExpanded={isExpanded} 
					/>
					)
				)}
			</div>
		</div>
	)
}