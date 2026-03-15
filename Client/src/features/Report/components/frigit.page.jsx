import { useEffect, useRef } from "react";

const IcoFidget = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const W = canvas.width, H = canvas.height;
        const cx = W / 2, cy = H / 2;
        const phi = (1 + Math.sqrt(5)) / 2;

        const icoVerts = [
            [0,1,phi],[0,-1,phi],[0,1,-phi],[0,-1,-phi],
            [1,phi,0],[-1,phi,0],[1,-phi,0],[-1,-phi,0],
            [phi,0,1],[phi,0,-1],[-phi,0,1],[-phi,0,-1],
        ].map(v => { const l = Math.hypot(...v); return v.map(x => x / l); });

        const icoFaces = [
            [0,1,8],[0,8,4],[0,4,5],[0,5,10],[0,10,1],
            [1,6,8],[8,6,9],[8,9,4],[4,9,2],[4,2,5],
            [5,2,11],[5,11,10],[10,11,7],[10,7,1],[1,7,6],
            [3,6,7],[3,7,11],[3,11,2],[3,2,9],[3,9,6],
        ];

        const subdivideFace = (v0, v1, v2, depth) => {
            if (depth === 0) return [[v0, v1, v2]];
            const mid = (a, b) => { const m = a.map((x, i) => (x + b[i]) / 2); const l = Math.hypot(...m); return m.map(x => x / l); };
            const m01 = mid(v0, v1), m12 = mid(v1, v2), m20 = mid(v2, v0);
            return [
                ...subdivideFace(v0, m01, m20, depth - 1),
                ...subdivideFace(m01, v1, m12, depth - 1),
                ...subdivideFace(m20, m12, v2, depth - 1),
                ...subdivideFace(m01, m12, m20, depth - 1),
            ];
        };

        const faces = icoFaces.flatMap(([a, b, c]) =>
            subdivideFace(icoVerts[a], icoVerts[b], icoVerts[c], 1)
        );

        let rotX = 0.4, rotY = 0.6, vX = 0, vY = 0.004;
        let dragging = false, lastX = 0, lastY = 0;
        let hovered = -1, t = 0;
        const faceFlash = new Array(80).fill(0);

        const rotatePoint = (p, rx, ry) => {
            let [x, y, z] = p;
            let y1 = y * Math.cos(rx) - z * Math.sin(rx);
            let z1 = y * Math.sin(rx) + z * Math.cos(rx);
            let x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
            let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
            return [x2, y1, z2];
        };

        const project = p => {
            const fov = 3.2;
            const z = p[2] + fov;
            return [cx + (p[0] / z) * 140 * fov, cy - (p[1] / z) * 140 * fov, p[2]];
        };

        const faceNormal = (v0, v1, v2) => {
            const ax = v1[0]-v0[0], ay = v1[1]-v0[1], az = v1[2]-v0[2];
            const bx = v2[0]-v0[0], by = v2[1]-v0[1], bz = v2[2]-v0[2];
            const nx = ay*bz-az*by, ny = az*bx-ax*bz, nz = ax*by-ay*bx;
            const l = Math.hypot(nx, ny, nz);
            return [nx/l, ny/l, nz/l];
        };

        const lerp = (a, b, k) => a + (b - a) * k;
        const getPos = e => { const r = canvas.getBoundingClientRect(); const s = e.touches ? e.touches[0] : e; return { x: s.clientX - r.left, y: s.clientY - r.top }; };

        const onDown = e => { const p = getPos(e); dragging = true; lastX = p.x; lastY = p.y; vX = 0; vY = 0; };
        const onMove = e => { const p = getPos(e); if (dragging) { vY = (p.x - lastX) * 0.012; vX = (p.y - lastY) * 0.012; rotY += vY; rotX += vX; lastX = p.x; lastY = p.y; } };
        const onUp = () => { dragging = false; };
        const onClick = () => { if (hovered >= 0) faceFlash[hovered % faceFlash.length] = 1.0; };

        canvas.addEventListener("mousedown", onDown);
        canvas.addEventListener("mousemove", onMove);
        canvas.addEventListener("mouseup", onUp);
        canvas.addEventListener("click", onClick);
        canvas.addEventListener("touchstart", e => { e.preventDefault(); onDown(e); }, { passive: false });
        canvas.addEventListener("touchmove", e => { e.preventDefault(); onMove(e); }, { passive: false });
        canvas.addEventListener("touchend", onUp);

        const ld = [0.4, 0.6, 1.0].map((x, _, a) => x / Math.hypot(...[0.4, 0.6, 1.0]));

        let rafId;
        const draw = () => {
            rafId = requestAnimationFrame(draw);
            t += 0.016;
            if (!dragging) { vY = lerp(vY, 0.004 + 0.002 * Math.sin(t * 0.3), 0.03); vX = lerp(vX, 0.0005 * Math.sin(t * 0.2), 0.03); rotY += vY; rotX += vX; }
            for (let i = 0; i < faceFlash.length; i++) if (faceFlash[i] > 0) faceFlash[i] *= 0.88;
            ctx.clearRect(0, 0, W, H);

            const rendered = faces.map((face, fi) => {
                const rv = face.map(v => rotatePoint(v, rotX, rotY));
                const n = faceNormal(rv[0], rv[1], rv[2]);
                const c = [rv.reduce((s,v)=>s+v[0],0)/3, rv.reduce((s,v)=>s+v[1],0)/3, rv.reduce((s,v)=>s+v[2],0)/3];
                const dot = n[0]*ld[0]+n[1]*ld[1]+n[2]*ld[2];
                return { fi, proj: rv.map(v => project(v)), n, c, dot, depth: c[2] };
            }).filter(f => f.n[2] > -0.05);

            rendered.sort((a, b) => a.depth - b.depth);
            let closestFace = -1, closestDist = 999;
            rendered.forEach(({ fi, proj, n }) => {
                const px = (proj[0][0]+proj[1][0]+proj[2][0])/3;
                const py = (proj[0][1]+proj[1][1]+proj[2][1])/3;
                if (n[2] > 0.3) { const d = Math.hypot(px - cx, py - cy); if (d < closestDist) { closestDist = d; closestFace = fi; } }
            });
            hovered = closestFace;

            rendered.forEach(({ fi, proj, dot }) => {
                const light = Math.max(0, dot);
                const flash = faceFlash[fi % faceFlash.length] || 0;
                const isHov = fi === hovered;
                const fill_a = lerp(0.04, 0.18, light) + flash * 0.3 + (isHov ? 0.08 : 0);
                const edge_a = lerp(0.15, 0.7, light) + flash * 0.5;
                ctx.beginPath();
                ctx.moveTo(proj[0][0], proj[0][1]);
                ctx.lineTo(proj[1][0], proj[1][1]);
                ctx.lineTo(proj[2][0], proj[2][1]);
                ctx.closePath();
                ctx.fillStyle = `rgba(45,212,191,${fill_a})`;
                ctx.fill();
                ctx.strokeStyle = `rgba(45,212,191,${edge_a})`;
                ctx.lineWidth = flash > 0.1 ? 1.2 : isHov ? 0.9 : 0.4;
                ctx.stroke();
            });
        };
        draw();
        return () => { cancelAnimationFrame(rafId); canvas.removeEventListener("mousedown", onDown); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseup", onUp); canvas.removeEventListener("click", onClick); };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={500}
            className="cursor-grab active:cursor-grabbing touch-none"
        />
    );
};

export default IcoFidget