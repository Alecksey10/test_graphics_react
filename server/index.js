import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import "react-dom/client";
import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$1
});
function meta$1({}) {
	return [{ title: "New React Router App" }, {
		name: "description",
		content: "Welcome to React Router!"
	}];
}
var home_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", { children: "Тестовая кнопка" }), /* @__PURE__ */ jsxs("div", {
		style: {
			width: "100vw",
			height: "100vh"
		},
		children: [/* @__PURE__ */ jsx(Link, {
			to: { pathname: "./part1/try1" },
			target: "_blank",
			style: { color: "blue" },
			children: " Вариант 1  "
		}), /* @__PURE__ */ jsxs(Canvas, { children: [
			/* @__PURE__ */ jsx("ambientLight", { intensity: Math.PI / 2 }),
			/* @__PURE__ */ jsx("spotLight", {
				position: [
					10,
					10,
					10
				],
				angle: .15,
				penumbra: 1,
				decay: 0,
				intensity: Math.PI
			}),
			/* @__PURE__ */ jsx("pointLight", {
				position: [
					-10,
					-10,
					-10
				],
				decay: 0,
				intensity: Math.PI
			}),
			/* @__PURE__ */ jsx(Box$1, { position: [
				-1.2,
				0,
				0
			] }),
			/* @__PURE__ */ jsx(Box$1, { position: [
				1.2,
				0,
				0
			] })
		] })]
	})] });
});
function Box$1(props) {
	const ref = useRef(null);
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	useFrame((state, delta) => ref.current.rotation.x += delta);
	return /* @__PURE__ */ jsxs("mesh", {
		...props,
		ref,
		scale: clicked ? 1.5 : 1,
		onClick: (event) => click(!clicked),
		onPointerOver: (event) => hover(true),
		onPointerOut: (event) => hover(false),
		children: [/* @__PURE__ */ jsx("boxGeometry", { args: [
			1,
			1,
			1
		] }), /* @__PURE__ */ jsx("meshStandardMaterial", { color: hovered ? "hotpink" : "orange" })]
	});
}
//#endregion
//#region app/routes/index.tsx
var routes_exports = /* @__PURE__ */ __exportAll({
	default: () => routes_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "New React Router App" }, {
		name: "description",
		content: "Welcome to React Router!"
	}];
}
var routes_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", { children: "Тестовая кнопка" }), /* @__PURE__ */ jsxs("div", {
		style: {
			width: "100vw",
			height: "100vh"
		},
		children: [/* @__PURE__ */ jsx(Link, {
			to: { pathname: "./part1/try1" },
			target: "_blank",
			style: { color: "blue" },
			children: " Вариант 1  "
		}), /* @__PURE__ */ jsxs(Canvas, { children: [
			/* @__PURE__ */ jsx("ambientLight", { intensity: Math.PI / 2 }),
			/* @__PURE__ */ jsx("spotLight", {
				position: [
					10,
					10,
					10
				],
				angle: .15,
				penumbra: 1,
				decay: 0,
				intensity: Math.PI
			}),
			/* @__PURE__ */ jsx("pointLight", {
				position: [
					-10,
					-10,
					-10
				],
				decay: 0,
				intensity: Math.PI
			}),
			/* @__PURE__ */ jsx(Box, { position: [
				-1.2,
				0,
				0
			] }),
			/* @__PURE__ */ jsx(Box, { position: [
				1.2,
				0,
				0
			] })
		] })]
	})] });
});
function Box(props) {
	const ref = useRef(null);
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	useFrame((state, delta) => ref.current.rotation.x += delta);
	return /* @__PURE__ */ jsxs("mesh", {
		...props,
		ref,
		scale: clicked ? 1.5 : 1,
		onClick: (event) => click(!clicked),
		onPointerOver: (event) => hover(true),
		onPointerOut: (event) => hover(false),
		children: [/* @__PURE__ */ jsx("boxGeometry", { args: [
			1,
			1,
			1
		] }), /* @__PURE__ */ jsx("meshStandardMaterial", { color: hovered ? "hotpink" : "orange" })]
	});
}
//#endregion
//#region app/geometry/utils.ts
function intersectLines2D(seg1, seg2) {
	const p1 = seg1.start;
	const p2 = seg1.end;
	const p3 = seg2.start;
	const p4 = seg2.end;
	const d1 = new THREE.Vector3().copy(p2).sub(p1);
	const d2 = new THREE.Vector3().copy(p4).sub(p3);
	const denom = d1.x * d2.y - d1.y * d2.x;
	if (Math.abs(denom) < 1e-10) return { intersects: false };
	const diff = new THREE.Vector3().copy(p3).sub(p1);
	const t1 = (diff.x * d2.y - diff.y * d2.x) / denom;
	const t2 = (diff.x * d1.y - diff.y * d1.x) / denom;
	if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) return {
		intersects: true,
		point: new THREE.Vector3().copy(p1).add(d1.clone().multiplyScalar(t1)),
		t1,
		t2
	};
	return { intersects: false };
}
function closestPointsBetweenLines(seg1, seg2) {
	const p1 = seg1.start;
	const p2 = seg1.end;
	const p3 = seg2.start;
	const p4 = seg2.end;
	const d1 = new THREE.Vector3().copy(p2).sub(p1);
	const d2 = new THREE.Vector3().copy(p4).sub(p3);
	const r = new THREE.Vector3().copy(p3).sub(p1);
	const a = d1.dot(d1);
	const b = d1.dot(d2);
	const c = d2.dot(d2);
	const d = d1.dot(r);
	const e = d2.dot(r);
	const det = a * c - b * b;
	let t1 = 0;
	let t2 = 0;
	if (det < 1e-10) {
		t1 = 0;
		t2 = e / c;
	} else {
		t1 = (b * e - c * d) / det;
		t2 = (a * e - b * d) / det;
	}
	t1 = Math.max(0, Math.min(1, t1));
	t2 = Math.max(0, Math.min(1, t2));
	const point1 = new THREE.Vector3().copy(p1).add(d1.clone().multiplyScalar(t1));
	const point2 = new THREE.Vector3().copy(p3).add(d2.clone().multiplyScalar(t2));
	const distance = point1.distanceTo(point2);
	return {
		point1,
		point2,
		t1,
		t2,
		distance
	};
}
//#endregion
//#region app/components/LinesScene.tsx
var LinesScene = React.memo(({ segments, points, sourcePoints }) => {
	const lineGeometry = useMemo(() => {
		const positions = [];
		segments.forEach((seg) => {
			positions.push(seg.start.x, seg.start.y, seg.start.z);
			positions.push(seg.end.x, seg.end.y, seg.end.z);
		});
		const geom = new THREE.BufferGeometry();
		geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
		return geom;
	}, [segments]);
	console.log("render LinesScene", sourcePoints.length);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("lineSegments", {
		geometry: lineGeometry,
		children: /* @__PURE__ */ jsx("lineBasicMaterial", { color: "red" })
	}), sourcePoints.map((p, idx) => /* @__PURE__ */ jsxs("mesh", {
		position: p,
		children: [/* @__PURE__ */ jsx("sphereGeometry", { args: [
			.03,
			8,
			8
		] }), /* @__PURE__ */ jsx("meshStandardMaterial", { color: "red" })]
	}, `point-${idx}`))] });
});
LinesScene.displayName = "LinesScene";
//#endregion
//#region app/geometry/generators.ts
function generateRandomLines(count, minx, maxx, miny, maxy, minz, maxz) {
	const lines = [];
	for (let i = 0; i < count; i++) {
		const start = new THREE.Vector3(Math.random() * (maxx - minx) + minx, Math.random() * (maxy - miny) + miny, Math.random() * (maxx - minz) + minz);
		const end = new THREE.Vector3(Math.random() * (maxx - minx) + minx, Math.random() * (maxy - miny) + miny, Math.random() * (maxx - minz) + minz);
		lines.push({
			start,
			end
		});
	}
	return lines;
}
function generateRandomPoints(count, minx, maxx, miny, maxy, minz, maxz) {
	const pts = [];
	for (let i = 0; i < count; i++) pts.push(new THREE.Vector3(Math.random() * (maxx - minx) + minx, Math.random() * (maxy - miny) + miny, Math.random() * (maxz - minz) + minz));
	return pts;
}
//#endregion
//#region app/geometry/SpatialHash.ts
var SpatialHash = class {
	cellSize;
	pointMap = /* @__PURE__ */ new Map();
	segmentMap = /* @__PURE__ */ new Map();
	constructor(cellSize = 1) {
		this.cellSize = cellSize;
	}
	getCellKey(x, y) {
		return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
	}
	insertPoint(point) {
		const key = this.getCellKey(point.x, point.y);
		if (!this.pointMap.has(key)) this.pointMap.set(key, []);
		this.pointMap.get(key).push(point);
	}
	queryPoints(line) {
		const minX = Math.min(line.start.x, line.end.x);
		const maxX = Math.max(line.start.x, line.end.x);
		const minY = Math.min(line.start.y, line.end.y);
		const maxY = Math.max(line.start.y, line.end.y);
		const startCX = Math.floor(minX / this.cellSize);
		const endCX = Math.floor(maxX / this.cellSize);
		const startCY = Math.floor(minY / this.cellSize);
		const endCY = Math.floor(maxY / this.cellSize);
		const result = [];
		const visited = /* @__PURE__ */ new Set();
		for (let cx = startCX; cx <= endCX; cx++) for (let cy = startCY; cy <= endCY; cy++) {
			const key = `${cx},${cy}`;
			const points = this.pointMap.get(key);
			if (points) {
				for (const p of points) if (!visited.has(p)) {
					visited.add(p);
					result.push(p);
				}
			}
		}
		return result;
	}
	insertSegment(line) {
		const minX = Math.min(line.start.x, line.end.x);
		const maxX = Math.max(line.start.x, line.end.x);
		const minY = Math.min(line.start.y, line.end.y);
		const maxY = Math.max(line.start.y, line.end.y);
		const startCX = Math.floor(minX / this.cellSize);
		const endCX = Math.floor(maxX / this.cellSize);
		const startCY = Math.floor(minY / this.cellSize);
		const endCY = Math.floor(maxY / this.cellSize);
		for (let cx = startCX; cx <= endCX; cx++) for (let cy = startCY; cy <= endCY; cy++) {
			const key = `${cx},${cy}`;
			if (!this.segmentMap.has(key)) this.segmentMap.set(key, []);
			this.segmentMap.get(key).push(line);
		}
	}
	querySegments(line) {
		const minX = Math.min(line.start.x, line.end.x);
		const maxX = Math.max(line.start.x, line.end.x);
		const minY = Math.min(line.start.y, line.end.y);
		const maxY = Math.max(line.start.y, line.end.y);
		const startCX = Math.floor(minX / this.cellSize);
		const endCX = Math.floor(maxX / this.cellSize);
		const startCY = Math.floor(minY / this.cellSize);
		const endCY = Math.floor(maxY / this.cellSize);
		const result = [];
		const visited = /* @__PURE__ */ new Set();
		for (let cx = startCX; cx <= endCX; cx++) for (let cy = startCY; cy <= endCY; cy++) {
			const key = `${cx},${cy}`;
			const segments = this.segmentMap.get(key);
			if (segments) {
				for (const seg of segments) if (!visited.has(seg)) {
					visited.add(seg);
					result.push(seg);
				}
			}
		}
		return result;
	}
	clear() {
		this.pointMap.clear();
		this.segmentMap.clear();
	}
};
//#endregion
//#region app/TreeTypeOne/TreeTypeOne.tsx
var TreeTypeOne = class {
	lines;
	sourcePoints;
	options;
	constructor(lines, sourcePoints, options = {}) {
		this.lines = lines;
		this.sourcePoints = sourcePoints;
		this.options = {
			linesPerPoint: 2,
			minDistanceToExisting: .5,
			lineLength: 1.5,
			angleSpread: Math.PI * 2,
			branching: false,
			maxAttemptsPerPoint: 30,
			growHeightFunction: null,
			cellSize: 1,
			...options
		};
	}
	grow() {
		const newLines = [];
		const pointsQueue = this.sourcePoints.map((p) => p.clone());
		const EPSILON = 1e-6;
		const hash = new SpatialHash(this.options.cellSize);
		this.lines.forEach((line) => hash.insertSegment(line));
		this.lines.forEach((line) => {
			hash.insertPoint(line.start);
			hash.insertPoint(line.end);
		});
		this.sourcePoints.forEach((p) => hash.insertPoint(p));
		while (pointsQueue.length > 0) {
			const point = pointsQueue.shift();
			let linesGenerated = 0;
			let attempts = 0;
			while (linesGenerated < this.options.linesPerPoint && attempts < this.options.maxAttemptsPerPoint) {
				attempts++;
				const angle = Math.random() * this.options.angleSpread;
				const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
				let end;
				let step = dir.multiplyScalar(this.options.lineLength);
				if (this.options.growHeightFunction != null) {
					let func_val = this.options.growHeightFunction(point.x, point.y);
					step.x *= func_val;
					step.y *= func_val;
				}
				end = point.clone().add(step);
				const candidate = {
					start: point.clone(),
					end
				};
				const neighborSegments = hash.querySegments(candidate);
				let intersects = false;
				for (const existing of neighborSegments) {
					const result = intersectLines2D(existing, candidate);
					if (result.intersects && result.point) {
						if (!(point.distanceTo(result.point) < EPSILON)) {
							intersects = true;
							break;
						}
					}
				}
				if (intersects) continue;
				let tooClose = false;
				for (const existing of neighborSegments) {
					const closest = closestPointsBetweenLines(existing, candidate);
					if (closest.point1.distanceTo(closest.point2) < this.options.minDistanceToExisting) {
						if (!(candidate.start.distanceTo(existing.start) < EPSILON && (closest.point1.distanceTo(candidate.start) < EPSILON || closest.point2.distanceTo(existing.start) < EPSILON))) {
							tooClose = true;
							break;
						}
					}
				}
				if (tooClose) continue;
				const neighborPoints = hash.queryPoints(candidate);
				let tooCloseToPoint = false;
				for (const p of neighborPoints) {
					if (candidate.start.distanceTo(p) < EPSILON) continue;
					if (candidate.end.distanceTo(p) < this.options.minDistanceToExisting) {
						tooCloseToPoint = true;
						break;
					}
				}
				if (tooCloseToPoint) continue;
				newLines.push(candidate);
				hash.insertSegment(candidate);
				hash.insertPoint(candidate.end);
				hash.insertPoint(candidate.start);
				linesGenerated++;
				if (this.options.branching) pointsQueue.push(candidate.end.clone());
			}
		}
		return newLines;
	}
};
//#endregion
//#region app/TreeTypeOne/ComponentGUI.tsx
var generationSettingsConfig = [
	{
		key: "pointsCount",
		label: "Точек",
		type: "number",
		min: 1,
		max: 100,
		step: 1,
		guiType: "range",
		format: (v) => String(v)
	},
	{
		key: "lineLength",
		label: "Длина",
		type: "number",
		min: .2,
		max: 3,
		step: .05,
		guiType: "range",
		format: (v) => v.toFixed(2)
	},
	{
		key: "lineLengthVariation",
		label: "Разброс длины",
		type: "number",
		min: 0,
		max: .8,
		step: .05,
		guiType: "range",
		format: (v) => `${(v * 100).toFixed(0)}%`
	},
	{
		key: "maxAttempts",
		label: "Попыток",
		type: "number",
		min: 1,
		max: 80,
		step: 1,
		guiType: "range",
		format: (v) => String(v)
	},
	{
		key: "minDistance",
		label: "Мин. расстояние",
		type: "number",
		min: .05,
		max: 2,
		step: .01,
		guiType: "range",
		format: (v) => v.toFixed(2)
	},
	{
		key: "decayFactor",
		label: "Затухание длины",
		type: "number",
		min: .5,
		max: 1,
		step: .01,
		guiType: "range",
		format: (v) => `${(v * 100).toFixed(0)}%`
	},
	{
		key: "useHeightFunc",
		label: "Использовать функцию высоты",
		type: "boolean",
		guiType: "checkbox"
	}
];
function SettingsWidget({ config, settings, onSettingsChange }) {
	const handleChange = (key, value) => {
		onSettingsChange({ [key]: value });
	};
	const renderControl = (field) => {
		const value = settings[field.key];
		const commonStyle = {
			width: "100%",
			background: "#333"
		};
		switch (field.guiType) {
			case "range": return /* @__PURE__ */ jsx("input", {
				type: "range",
				min: field.min,
				max: field.max,
				step: field.step,
				value,
				onChange: (e) => handleChange(field.key, Number(e.target.value)),
				style: commonStyle
			});
			case "checkbox": return /* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: value,
				onChange: (e) => handleChange(field.key, e.target.checked)
			});
			case "input": return /* @__PURE__ */ jsx("input", {
				type: field.type === "number" ? "number" : "text",
				value,
				onChange: (e) => {
					const val = field.type === "number" ? Number(e.target.value) : e.target.value;
					handleChange(field.key, val);
				},
				style: { width: "100%" }
			});
			case "select": return /* @__PURE__ */ jsx("select", {
				value,
				onChange: (e) => handleChange(field.key, e.target.value),
				style: { width: "100%" },
				children: field.options?.map((opt) => /* @__PURE__ */ jsx("option", {
					value: opt,
					children: opt
				}, opt))
			});
			default: return null;
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		style: {
			position: "absolute",
			bottom: "20px",
			right: "20px",
			background: "rgba(20, 20, 30, 0.85)",
			color: "#eee",
			padding: "16px 18px",
			borderRadius: "12px",
			border: "1px solid #444",
			backdropFilter: "blur(4px)",
			zIndex: 20,
			minWidth: "220px",
			display: "flex",
			flexDirection: "column",
			gap: "6px",
			fontSize: "13px",
			fontFamily: "monospace",
			pointerEvents: "auto",
			userSelect: "none"
		},
		children: [/* @__PURE__ */ jsx("div", {
			style: {
				fontWeight: "bold",
				marginBottom: "4px",
				color: "#8af"
			},
			children: "⚙️ Настройки"
		}), config.map((field) => {
			const value = settings[field.key];
			const displayValue = field.format ? field.format(value) : String(value);
			return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", { children: [
				field.label,
				": ",
				displayValue
			] }), renderControl(field)] }, String(field.key));
		})]
	});
}
//#endregion
//#region app/TreeTypeOne/GlobalParams.tsx
var SceneParamsContext = createContext({
	width: 10,
	height: 10
});
var useGetSceneParams = () => useContext(SceneParamsContext);
//#endregion
//#region app/TreeTypeOne/HeightMap.tsx
var defaultFunc = (x, y) => Math.sin(x * 30) * Math.cos(y * 30) * .5 + .5;
var HeightMap = ({ resWidth = 10, resHeight = 10, width = 4, height = 4, resolution = 1024, func = defaultFunc, position = [
	0,
	0,
	0
], rotation = [
	-Math.PI / 2,
	0,
	0
] }) => {
	const texture = useMemo(() => {
		const canvas = document.createElement("canvas");
		canvas.width = resolution;
		canvas.height = resolution;
		const ctx = canvas.getContext("2d");
		const imageData = ctx.createImageData(resolution, resolution);
		const data = imageData.data;
		for (let py = 0; py < resolution; py++) for (let px = 0; px < resolution; px++) {
			const u = px / resolution;
			const v = py / resolution;
			const value = func((u - .5) * width, (v - .5) * height);
			const idx = (py * resolution + px) * 4;
			const byte = Math.min(255, Math.max(0, Math.round(value * 255)));
			data[idx] = byte;
			data[idx + 1] = byte;
			data[idx + 2] = byte;
			data[idx + 3] = 255;
		}
		ctx.putImageData(imageData, 0, 0);
		const tex = new THREE.CanvasTexture(canvas);
		tex.minFilter = THREE.NearestFilter;
		tex.magFilter = THREE.NearestFilter;
		return tex;
	}, [func, resolution]);
	return /* @__PURE__ */ jsxs("mesh", {
		position,
		rotation,
		children: [/* @__PURE__ */ jsx("planeGeometry", { args: [width, height] }), /* @__PURE__ */ jsx("meshBasicMaterial", {
			map: texture,
			side: THREE.DoubleSide
		})]
	});
};
//#endregion
//#region app/TreeTypeOne/Configs.tsx
var baseSettings = {
	pointsCount: 4,
	lineLength: 1,
	lineLengthVariation: .3,
	maxAttempts: 20,
	minDistance: .95,
	decayFactor: 1,
	useHeightFunc: true
};
var func1 = (x, y) => {
	return Math.min(1, Math.max(.1, Math.sin(x) * Math.cos(y) + .5));
};
var foreverAwaySettings = {
	pointsCount: 10,
	lineLength: 1,
	lineLengthVariation: 0,
	maxAttempts: 20,
	minDistance: .8,
	decayFactor: .5,
	useHeightFunc: false
};
var denseForestSettings = {
	pointsCount: 12,
	lineLength: .6,
	lineLengthVariation: .1,
	maxAttempts: 50,
	minDistance: .2,
	decayFactor: .9,
	useHeightFunc: true
};
var denseForestFunc = (x, y) => {
	const r = Math.sqrt(x * x + y * y);
	return Math.min(1, Math.max(.2, 1 - r * .3));
};
var palmSettings = {
	pointsCount: 3,
	lineLength: 2.5,
	lineLengthVariation: .05,
	maxAttempts: 15,
	minDistance: 1.2,
	decayFactor: .95,
	useHeightFunc: true
};
var palmFunc = (x, y) => {
	return .8 + .2 * Math.sin(x * 2) * Math.cos(y * 2);
};
var presets = [
	{
		id: "base",
		name: "Базовый (синус-косинус)",
		description: "Использует функцию sin(x)*cos(y)+0.5",
		settings: baseSettings,
		heightFunc: func1
	},
	{
		id: "foreverAway",
		name: "Уходящий навсегда",
		description: "\"Никогда\" не дотянется обратно, затухает быстро.",
		settings: foreverAwaySettings,
		heightFunc: void 0
	},
	{
		id: "dense-forest",
		name: "Густой лес",
		description: "Много коротких веток, высота убывает от центра",
		settings: denseForestSettings,
		heightFunc: denseForestFunc
	},
	{
		id: "palms",
		name: "Высокие пальмы",
		description: "Длинные стволы, плавная высота",
		settings: palmSettings,
		heightFunc: palmFunc
	},
	{
		id: "chaotic",
		name: "Хаотичный",
		description: "Большой разброс, много попыток",
		settings: {
			pointsCount: 7,
			lineLength: 1.8,
			lineLengthVariation: .7,
			maxAttempts: 80,
			minDistance: .1,
			decayFactor: .5,
			useHeightFunc: false
		},
		heightFunc: void 0
	},
	{
		id: "uniform",
		name: "Равномерный",
		description: "Без функции высоты, равномерно",
		settings: {
			pointsCount: 6,
			lineLength: 1.2,
			lineLengthVariation: .2,
			maxAttempts: 30,
			minDistance: .4,
			decayFactor: 1,
			useHeightFunc: false
		},
		heightFunc: void 0
	}
];
var defaultPreset = presets[0];
//#endregion
//#region app/TreeTypeOne/PresetSelector.tsx
function PresetSelector({ currentPresetId, onSelect }) {
	return /* @__PURE__ */ jsx(Menu, {
		menuButton: /* @__PURE__ */ jsxs(MenuButton, {
			style: {
				padding: "6px 14px",
				cursor: "pointer"
			},
			children: ["📋 ", (presets.find((p) => p.id === currentPresetId) || presets[0]).name]
		}),
		transition: true,
		children: presets.map((preset) => /* @__PURE__ */ jsx(MenuItem, {
			onClick: () => onSelect(preset),
			style: preset.id === currentPresetId ? {
				backgroundColor: "#2a2a3a",
				fontWeight: "bold"
			} : void 0,
			children: /* @__PURE__ */ jsxs("span", {
				style: {
					display: "flex",
					flexDirection: "column"
				},
				children: [/* @__PURE__ */ jsx("span", { children: preset.name }), preset.description && /* @__PURE__ */ jsx("span", {
					style: {
						fontSize: "0.75em",
						opacity: .7
					},
					children: preset.description
				})]
			})
		}, preset.id))
	});
}
//#endregion
//#region app/routes/part1try1.tsx
var part1try1_exports = /* @__PURE__ */ __exportAll({ default: () => part1try1_default });
var part1try1_default = UNSAFE_withComponentProps(function Home() {
	let sceneContext = useGetSceneParams();
	sceneContext.height = 100;
	sceneContext.width = 100;
	const handleSelectPreset = (preset) => {
		setCurrentPreset(preset);
		console.log("Выбран пресет:", preset.name);
		handleRegenerate();
		setSettings(preset.settings);
	};
	const [segments, setSegments] = useState(() => generateRandomLines(0, -1, 1, -1, 1, 0, 0));
	const [points, setPoints] = useState(() => generateRandomPoints(1, -1, 1, -1, 1, 0, 0));
	const [sourcePoints, setSourcePoints] = useState(points);
	const [currentPreset, setCurrentPreset] = useState(defaultPreset);
	let [settings, setSettings] = useState(currentPreset.settings);
	const handleRegenerate = () => {
		const newSegments = generateRandomLines(0, -1, 1, -1, 1, 0, 0);
		const newPoints = generateRandomPoints(settings.pointsCount, -1, 1, -1, 1, 0, 0);
		setSegments(newSegments);
		setPoints(newPoints);
		setSourcePoints(newPoints);
		console.log("Выбран пресет:", currentPreset.name);
		setSettings(currentPreset.settings);
	};
	const handleClear = () => {
		setPoints([]);
		setSegments([]);
		setSourcePoints([]);
	};
	const handleClearPoints = () => {
		setPoints([]);
		setSourcePoints([]);
	};
	const handleGrow = () => {
		const newLines = new TreeTypeOne(segments, sourcePoints, {
			linesPerPoint: settings.pointsCount,
			minDistanceToExisting: settings.minDistance,
			lineLength: settings.lineLength,
			branching: false,
			maxAttemptsPerPoint: settings.maxAttempts,
			cellSize: .1,
			growHeightFunction: currentPreset.heightFunc
		}).grow();
		const newPoints = newLines.map((line) => line.end);
		setSegments((prev) => [...prev, ...newLines]);
		setPoints((prev) => [...prev, ...newPoints]);
		setSourcePoints(newPoints);
		setSettings((prev) => ({
			...prev,
			lineLength: prev.lineLength * prev.decayFactor,
			minDistance: prev.minDistance * prev.decayFactor
		}));
	};
	return /* @__PURE__ */ jsxs("div", {
		style: {
			width: "100vw",
			height: "100vh",
			position: "relative"
		},
		children: [
			/* @__PURE__ */ jsxs(Menu, {
				menuButton: /* @__PURE__ */ jsx(MenuButton, { children: "Меню" }),
				transition: true,
				children: [
					/* @__PURE__ */ jsx(MenuItem, {
						onClick: handleGrow,
						children: "Проитерировать"
					}),
					/* @__PURE__ */ jsx(MenuItem, {
						onClick: handleClear,
						children: "Очистить"
					}),
					/* @__PURE__ */ jsx(MenuItem, {
						onClick: handleClearPoints,
						children: "Убрать точки"
					}),
					/* @__PURE__ */ jsx(MenuItem, {
						onClick: handleRegenerate,
						children: "Пересоздать"
					}),
					" "
				]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: handleGrow,
				style: {
					padding: "6px 14px",
					cursor: "pointer"
				},
				children: "Итерировать"
			}),
			/* @__PURE__ */ jsx(PresetSelector, {
				currentPresetId: currentPreset.id,
				onSelect: handleSelectPreset
			}),
			/* @__PURE__ */ jsx(SettingsWidget, {
				config: generationSettingsConfig,
				settings,
				onSettingsChange: (partial) => setSettings((prev) => ({
					...prev,
					...partial
				}))
			}),
			/* @__PURE__ */ jsxs(Canvas, {
				camera: {
					position: [
						0,
						0,
						15
					],
					fov: 50
				},
				children: [
					/* @__PURE__ */ jsx("ambientLight", { intensity: .5 }),
					/* @__PURE__ */ jsx("pointLight", { position: [
						10,
						10,
						10
					] }),
					/* @__PURE__ */ jsx(Grid, { args: [10, 10] }),
					/* @__PURE__ */ jsx(OrbitControls, {}),
					/* @__PURE__ */ jsx(LinesScene, {
						segments,
						points,
						sourcePoints
					}),
					settings.useHeightFunc ? /* @__PURE__ */ jsx(HeightMap, {
						resWidth: 1,
						resHeight: 1,
						width: sceneContext.width,
						height: sceneContext.height,
						position: [
							0,
							0,
							0
						],
						rotation: [
							0,
							0,
							0
						],
						func: currentPreset.heightFunc,
						resolution: 1024
					}) : null
				]
			})
		]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/test_graphics_react/assets/entry.client-Bc_X405a.js",
		"imports": [
			"/test_graphics_react/assets/jsx-runtime-DZLcUPaz.js",
			"/test_graphics_react/assets/react-dom-DD8rQUJ9.js",
			"/test_graphics_react/assets/client-Z3JHRcXb.js",
			"/test_graphics_react/assets/components-DncoY3X8.js"
		],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/test_graphics_react/assets/root-C84vVVo2.js",
			"imports": [
				"/test_graphics_react/assets/jsx-runtime-DZLcUPaz.js",
				"/test_graphics_react/assets/react-dom-DD8rQUJ9.js",
				"/test_graphics_react/assets/client-Z3JHRcXb.js",
				"/test_graphics_react/assets/components-DncoY3X8.js",
				"/test_graphics_react/assets/lib-BJWapsaY.js"
			],
			"css": ["/test_graphics_react/assets/root-Cy8yAWQO.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/test_graphics_react/assets/home-YpsXpYmc.js",
			"imports": [
				"/test_graphics_react/assets/jsx-runtime-DZLcUPaz.js",
				"/test_graphics_react/assets/client-Z3JHRcXb.js",
				"/test_graphics_react/assets/lib-BJWapsaY.js",
				"/test_graphics_react/assets/welcome-jk57cU2D.js",
				"/test_graphics_react/assets/react-three-fiber.esm-BP9d_kB-.js",
				"/test_graphics_react/assets/react-dom-DD8rQUJ9.js",
				"/test_graphics_react/assets/components-DncoY3X8.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/index": {
			"id": "routes/index",
			"parentId": "root",
			"path": "test_graphics_react/",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/test_graphics_react/assets/index-YpsXpYmc.js",
			"imports": [
				"/test_graphics_react/assets/jsx-runtime-DZLcUPaz.js",
				"/test_graphics_react/assets/client-Z3JHRcXb.js",
				"/test_graphics_react/assets/lib-BJWapsaY.js",
				"/test_graphics_react/assets/welcome-jk57cU2D.js",
				"/test_graphics_react/assets/react-three-fiber.esm-BP9d_kB-.js",
				"/test_graphics_react/assets/react-dom-DD8rQUJ9.js",
				"/test_graphics_react/assets/components-DncoY3X8.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/part1try1": {
			"id": "routes/part1try1",
			"parentId": "root",
			"path": "test_graphics_react/part1/try1",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/test_graphics_react/assets/part1try1-Br6gGMGP.js",
			"imports": [
				"/test_graphics_react/assets/jsx-runtime-DZLcUPaz.js",
				"/test_graphics_react/assets/react-dom-DD8rQUJ9.js",
				"/test_graphics_react/assets/react-three-fiber.esm-BP9d_kB-.js"
			],
			"css": ["/test_graphics_react/assets/part1try1-BQclVesS.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/test_graphics_react/assets/manifest-4040e520.js",
	"version": "4040e520",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = { "unstable_optimizeDeps": false };
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/test_graphics_react/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/index": {
		id: "routes/index",
		parentId: "root",
		path: "test_graphics_react/",
		index: void 0,
		caseSensitive: void 0,
		module: routes_exports
	},
	"routes/part1try1": {
		id: "routes/part1try1",
		parentId: "root",
		path: "test_graphics_react/part1/try1",
		index: void 0,
		caseSensitive: void 0,
		module: part1try1_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
