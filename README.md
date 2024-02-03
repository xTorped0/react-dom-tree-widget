# Dom Tree Widget

Welcome to the Dom Tree Widget. This is a simple widget that allows you to view the structure of the DOM tree of the page. You can also view the styles of the elements and the event handlers attached to them. This widget is available for use on any rendered page.

Too see an example page you can open this link [GitHub Page](https://github.com/xTorped0/react-dom-tree-widget)

## Quick Start

To get started, you need to download the widget from the [GitHub Page](https://github.com/xTorped0/react-dom-tree-widget). After downloading the widget, you need to install dependencies using the command `npm i`. After that, to make sure that everything was installed correctly, you can run the command `npm run dev` and open the page in the browser. By default, the page will be available at the address [http://localhost:8080](http://localhost:8080).

If you're using **Native Javascript**, you need to make a bundle before using the widget. To do this, you need to run the command `npm run build` and after that you can import the widget in your project from the `index.js` file. To import the widget, you need to use the following code:

```javascript
import './path/to/bundled/index.js';
```

Or the same for inserting the widget into the html file:

```html
<script src="./path/to/bundled/index.js"></script>
```

If you're using **React**, you can import the widget component using the following code:

```jsx
import { Widget } from './src/app/index.tsx';
```

## Available Settings

The widget could be dragged and dropped to any place on the page. To do it you need to click on the icon ![drag](/svgs/drag.svg) and move it to the desired place. To hide the widget, you have to click on the icon ![hide](/svgs/hide.svg).

- To update the tree, you need to click on the icon ![update](/svgs/reload.svg).
- You also have the opportunity to change the tree display option (hidden/expanded) by adding the corresponding flag at the top of the widget.
- To highlight the selected node, you can click on the node name in the list of nodes.