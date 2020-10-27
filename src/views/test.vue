<template>
    <div>
        <svg id="svg">
            <path class="path" />
            <circle class="handle" cx="0" cy="0" r="8" />
            <circle class="handle" cx="0" cy="0" r="8" />
        </svg>
    </div>
</template>

<script>
    import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, TweenLite } from "gsap/all";
    gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin, TweenLite);

    export default {
        name: "test",
        mounted () {
            // Amount to offset control points
            let bezierWeight = 0.675;

            let handles = document.querySelectorAll(".handle");
            let path = document.querySelector(".path");

            TweenLite.set(handles[0], { x: 400, y: 150 });
            TweenLite.set(handles[1], { x: 200, y: 350 });

            Draggable.create(handles, {
                onDrag: updatePath
            });

            updatePath();

            function updatePath () {
                // migrate to 3
                let x1 = gsap.getProperty(handles[0], "x");
                let y1 = gsap.getProperty(handles[0], "y");

                let x4 = gsap.getProperty(handles[1], "x");
                let y4 = gsap.getProperty(handles[1], "y");

                // let x1 = handles[0]._gsTransform.x;
                // let y1 = handles[0]._gsTransform.y;
                //
                // let x4 = handles[1]._gsTransform.x;
                // let y4 = handles[1]._gsTransform.y;

                let dx = Math.abs(x4 - x1) * bezierWeight;

                let x2 = x1 - dx;
                let x3 = x4 + dx;

                let data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;

                path.setAttribute("d", data);
            }
        }
    }
</script>
