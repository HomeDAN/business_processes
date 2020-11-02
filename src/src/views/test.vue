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
    import { gsap, ScrollTrigger, Draggable, MotionPathPlugin, TweenLite, TimelineMax } from "gsap/all";
    gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin, TweenLite, TimelineMax);

    export default {
        name: "test",
        mounted () {
            let svg = document.querySelector('#svg');
            let tl = new TimelineMax();

            // create a timeline
            tl.add(createLineTween(svg));

            // this function creates a single tween that animates the stroke of an svg
            function createLineTween (svg) {
                let pathObject = {
                    length: 0,
                    pathLength: svg.getTotalLength()
                };

                let tween = TweenLite.to(pathObject, 2, {
                    length: pathObject.pathLength,
                    onUpdateParams: [pathObject, svg],
                    immediateRender: true
                });

                return tween;
            }
        }
    }
</script>

