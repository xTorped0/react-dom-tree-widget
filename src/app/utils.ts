import type { ShownNode } from "./types";

export function getDomTree(node: Node): ShownNode {
	function createTree(node: Node): ShownNode {
		const children = Array.from(node.childNodes)
			.filter(child => 
				child.nodeType === Node.ELEMENT_NODE 
				&& child.tagName !== 'SCRIPT' 
				&& child.className !== 'widget'
			)
			.map(createTree);
	
		const className = (node as HTMLElement).className || null;
		const selectName = (node as HTMLElement).tagName + (className ? `.${className}` : '');

		const isSvg = node instanceof SVGElement;
	
		return {
			tagName: (node as HTMLElement).tagName,
			node: (node as HTMLElement),
			attributes: Array.from((node as HTMLElement).attributes),
			className: typeof className === 'string' ? className : null,
			id: (node as HTMLElement).id || null,
			children: isSvg ? [] : children,
		};
	}

	return createTree(node)
}