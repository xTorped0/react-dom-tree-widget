export type Position = {
	top: string;
	left: string;
}

export interface State {
	target: string;
	position?: Position;
}

export type ShownNode = {
	tagName: string;
	attributes: Attr[];
	children: ShownNode[];
	node: HTMLElement;
	className: string | null;
	id: string | null;
}