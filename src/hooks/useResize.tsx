import React from 'react';

interface ResizeProps {
	elemName: string;
	setPosition: (position: { left: string, top: string }) => void;
}

export function useResize(props: ResizeProps) {
	const { setPosition, elemName } = props

	const dragStart = e => {
		const button = e.currentTarget;
		const mainElem = button.closest(elemName);

		document.body.style.userSelect = 'none';

		const rect = mainElem.getBoundingClientRect();
		const shiftX = e.clientX - rect.left;
		const shiftY = e.clientY - rect.top;

		const moveAt = (pageX, pageY) => {
			let newLeft = pageX - shiftX;
			let newTop = pageY - shiftY;

			// Check if new position is outside the viewport
			if(newLeft < 0) newLeft = 0;
			if(newTop < 0) newTop = 0;
			if(newLeft + mainElem.offsetWidth > document.documentElement.clientWidth) {
				newLeft = document.documentElement.clientWidth - mainElem.offsetWidth;
			}
			if(newTop + mainElem.offsetHeight > document.documentElement.clientHeight) {
				newTop = document.documentElement.clientHeight - mainElem.offsetHeight;
			}

			mainElem.style.left = `${newLeft}px`;
			mainElem.style.top = `${newTop}px`;
		};

		const onMouseMove = e => {
			moveAt(e.pageX, e.pageY);
		};

		const onMouseUp = () => {
			document.body.style.userSelect = '';
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

			const newPosition = { left: mainElem.style.left, top: mainElem.style.top };
			setPosition(newPosition);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	}

	return dragStart;
}
