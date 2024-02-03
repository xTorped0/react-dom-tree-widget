export type Position = {
	top: string;
	left: string;
}

export interface State {
	target: HTMLElement;
	position?: Position;
	isHidden?: boolean;
	isExpanded?: boolean;
}

export type ShownNode = {
	tagName: string;
	attributes: Attr[];
	children: ShownNode[];
	node: HTMLElement;
	className: string | null;
	id: string | null;
}