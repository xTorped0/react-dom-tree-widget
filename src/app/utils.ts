import type { ShownNode } from "./types";

export function getDomTree(node: Node): ShownNode {
	const children = Array.from(node.childNodes)
		.filter(child => child.nodeType === Node.ELEMENT_NODE)
		.map(getDomTree);

	return {
		tagName: (node as HTMLElement).tagName,
		node: (node as HTMLElement),
		attributes: Array.from((node as HTMLElement).attributes),
		className: (node as HTMLElement).className || null,
    id: (node as HTMLElement).id || null,
		children,
	};
}